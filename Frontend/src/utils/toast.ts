import { toast } from "@/components/ui/toast";

export const showToast = {
  success(title: string, description?: string) {
    toast.add({
      type: "success",
      title,
      description,
    });
  },

  error(title: string, description?: string) {
    toast.add({
      type: "error",
      title,
      description,
    });
  },
  info(title: string, description?: string) {
    toast.add({
      type: "info",
      title,
      description,
    });
  },
};
