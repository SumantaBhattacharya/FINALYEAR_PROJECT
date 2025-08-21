# ***Mega Blog***

***packages for this project***
```markdown
- npm i
- npm install @reduxjs/toolkit
- npm install react-redux
- npm install react-router-dom
- npm i appwrite
- npm i @tinymce/tinymce-react
- npm i html-react-parser
npm i react-hook-form
```


- ***Links i been though during the progression of this project***
  - [*Installation*](https://redux-toolkit.js.org/introduction/getting-started#an-existing-app)
  - [*whats-included*](https://redux-toolkit.js.org/introduction/getting-started#whats-included)
  - [*quick-start*](https://redux.js.org/tutorials/quick-start)
  - [*Create a redux-store*](https://redux.js.org/tutorials/quick-start#create-a-redux-store)
  - [*Create a Redux State Slice*](https://redux.js.org/tutorials/quick-start#create-a-redux-state-slice)- [*add-slice-reducers-to-the-store*](https://redux.js.org/tutorials/quick-start#add-slice-reducers-to-the-store)

  * [*appwrite*](https://appwrite.io/)
  * [*appwrite-pricing*](https://appwrite.io/pricing)
  * [*storage*](https://appwrite.io/docs/references/cloud/client-web/storage)
  * [*createFile*](https://appwrite.io/docs/references/cloud/client-web/storage#createFile)
  * [*tinymce-react*](https://www.npmjs.com/package/@tinymce/tinymce-react)
  * [*github.com/tinymce*](https://github.com/tinymce/tinymce)
  * [*tiny*](https://www.tiny.cloud/)
  * [*tiny.cloud/pricing/*](https://www.tiny.cloud/pricing/)
  * [*api references*](https://www.tiny.cloud/docs/tinymce/latest/apis/tinymce.root/)
  * [*html-react-parser*](https://www.npmjs.com/package/html-react-parser)
  * [*react-hook-form*](https://react-hook-form.com/)
  * [*vite-env-files*](https://vite.dev/guide/env-and-mode#env-files)
  * [*npm-appwrite*](https://www.npmjs.com/package/appwrite)
  - [*create-react-app-environment-variables*](https://create-react-app.dev/docs/adding-custom-environment-variables/)
  * [*vite-env-and-mode*](https://vite.dev/guide/env-and-mode)
  * [*appwrite-auth*](https://appwrite.io/docs/products/auth)
  * [*appwrite-auth-quick-start*](https://appwrite.io/docs/products/auth/quick-start)
  - [*appwrite-auth-email-password](https://appwrite.io/docs/products/auth/email-password)
  - [*appwrite-auth-email-password-login ](https://appwrite.io/docs/products/auth/email-password#login)
  - [*appwrite-updateDocument*](https://appwrite.io/docs/references/cloud/client-web/databases#updateDocument)
  - [*appwrite-deleteDocument*](https://appwrite.io/docs/references/cloud/client-web/databases#deleteDocument)
  - [*forwardRef](https://react.dev/reference/react/forwardRef)
  - [*useId* ](https://react.dev/reference/react/useId)
  - [*controller*](https://www.react-hook-form.com/api/usecontroller/controller/)
<!-- ![alt text](image.png) -->

> In JavaScript, you cannot use an assignment (=) directly in an export default statement unless the variable (service) is already declared earlier in the file.

> The children prop in React is a special prop that represents the content nested inside a component. 

>The forwardRef function is a higher-order component that allows you to pass a ref from a parent component to a child component. This is useful when you want to access a DOM element or a class component instance directly from the parent component.


> The useId hook is a React hook that generates a unique ID for each instance of the component. This is useful for accessibility purposes, such as associating a label with an input element.


```markdown
# COLLECTION - Blog

| TYPE       | ATTRIBUTE     | NOTES         |
|------------|---------------|---------------|
| string     | collectionId  | PK            |
| string     | name          |               |
| datetime   | createdAt     |               |
| datetime   | updatedAt     |               |

▼ contains ▼

---

# atricles

| TYPE       | ATTRIBUTE     | NOTES         |
|------------|---------------|---------------|
| string     | articleId     | PK            |
| string     | title         | **Required**  |
| string     | content       | **Required**  |
| string     | featureImage  | **Required**  |
| string     | status        |               |
| string     | userId        | FK            |
| datetime   | createdAt     | **Required**  |

▼ has ▼

---

# Reviews

| TYPE       | ATTRIBUTE     | NOTES         |
|------------|---------------|---------------|
| string     | reviewId      | PK            |
| string     | articleId     | FK            |
| string     | userId        | FK            |
| string     | comment       |               |
| integer    | rating        |               |
| datetime   | createdAt     | **Required**  |
```

