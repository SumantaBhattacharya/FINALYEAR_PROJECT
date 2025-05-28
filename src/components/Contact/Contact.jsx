import React from 'react'

const Contact = () => {
    return (
        <section className="bg-[#9CA3AF]">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
                <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Visit Our Location</h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Have a question, feedback, or just want to say hello? Feel free to reach out — We would love to hear from you!
                    </p>
                </div>
                <div className="mt-16 lg:mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10391.090288453828!2d88.53716613174477!3d22.95739169470463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8bf5871a9e0d7%3A0x3cbdf3b9f157e355!2sMaulana%20Abul%20Kalam%20Azad%20University%20of%20Technology!5e0!3m2!1sen!2sin!4v1746467447327!5m2!1sen!2sin"
                                width="100%"
                                height="480"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div>
                            <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                                <div className="px-6 py-4">
                                    <h3 className="text-lg font-medium text-gray-900">Our Address</h3>
                                    <p className="mt-1 text-gray-600">Haringhata Farm, West Bengal 741249</p>
                                </div>
                                <div className="border-t border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-medium text-gray-900">Contact</h3>
                                    <p className="mt-1 text-gray-600">
                                        Email:{' '}
                                        <a
                                            href="https://mail.google.com/mail/?view=cm&fs=1&to=team2025@gmail.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            team2025@gmail.com
                                        </a>
                                    </p>
                                    <p className="mt-1 text-gray-600">Phone: +91 8133862158</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
