import sweetAlert2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const sweetAlert = withReactContent(sweetAlert2);

export const warningAlert = (title: string, text: string) => {
  sweetAlert.fire({
    title,
    text,
    icon: "warning",
    confirmButtonText: "OK",
  });
};
