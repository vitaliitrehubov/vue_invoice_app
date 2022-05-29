import { Notify } from "quasar";

export const NOTIFY_SHOW_MSG = ({
  color = "primary",
  message = "",
  icon = "",
}) => {
  Notify.create({
    message,
    color,
    icon,
    position: "top",
  });
};
