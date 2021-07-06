import emailjs from 'emailjs-com'

const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_dr32wma', 'template_a2hpjwp', e.target, 'user_wdUJb3mFV5NJb1ToXLdY4')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()


}
export default sendEmail