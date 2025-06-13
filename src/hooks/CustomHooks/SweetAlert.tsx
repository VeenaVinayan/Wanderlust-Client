import Swal, {SweetAlertIcon} from "sweetalert2";

const useSweetAlert = () => {
    const showSuccess = (title: string, text: string) : void => {
        Swal.fire({
             title,
             text,
             icon:"success",
             confirmButtonColor:"#aCAF50",
        });
    }
    const showError = ( title: string, text: string) : void =>{
         Swal.fire({
             title,
             text,
             icon:"error",
             confirmButtonColor: "#d33",
         });
    }
    const showAlert = (title: string,text: string,icon:SweetAlertIcon):void =>{
            Swal.fire({
                title,
                text,
                icon,
                confirmButtonColor:"#3085d6",
          });
    };
    const showConfirm = (title: string, text:string, onConfirm: () => void):void =>{
        Swal.fire({
             title,
             text,
             icon:"warning",
             showCancelButton:true,
             confirmButtonText:"Yes, confirm",
             cancelButtonText:"Cancel",
          }).then((result) => {
             if(result.isConfirmed) {
                 onConfirm();
             }
        });
    };
   return { showSuccess, showError, showAlert, showConfirm};
}

export default useSweetAlert;