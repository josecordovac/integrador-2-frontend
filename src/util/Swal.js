import Swal from 'sweetalert2';


export const MessageUtil = (icon, title, text) => {

  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    // footer: ''
  })
};