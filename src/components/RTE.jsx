// src/components/RTE.jsx
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_ID}
            value={value}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link", 
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount"
              ],
              toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              // Add these image configuration options
              image_advtab: true, // Enable advanced image options
              image_title: true,
              automatic_uploads: true,
              file_picker_types: 'image',
              images_upload_url: '/upload/image', // Replace with your upload endpoint
              images_reuse_filename: true,
              images_upload_handler: async (blobInfo, progress) => {
                // Implement your image upload logic here
                const file = new File([blobInfo.blob()], blobInfo.filename(), {
                  type: blobInfo.blob().type
                });
                
                try {
                  const uploadedFile = await appwriteService.uploadFile(file);
                  return appwriteService.getFilePreview(uploadedFile.$id);
                } catch (error) {
                  console.error('Upload failed:', error);
                  return Promise.reject('Image upload failed');
                }
              }
            }}
          />
        )}
      />
    </div>
  );
}