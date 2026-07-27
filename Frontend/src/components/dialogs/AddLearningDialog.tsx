import { useLoadingStore } from "@/store/loadingStore";
import { showToast } from "@/utils/toast";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CommonDialog from "../common/CommonDialog";
import { addLearning } from "@/api/api";
import { Textarea } from "../ui/textarea";

interface AddLearningForm {
  title: string;
  description: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function AddLearningDialog({
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddLearningForm>();

  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const onSubmit = async (data: AddLearningForm) => {
    try {
      startLoading();

      await addLearning(data);

      await onSuccess();

      showToast.success("Learning Added", "Your learning has been published.");

      reset();
      onOpenChange(false);
    } catch (err: any) {
      showToast.error(
        "Failed",
        err.response?.data?.message ?? "Something went wrong",
      );
    } finally {
      stopLoading();
    }
  };

  return (
    <CommonDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add Learning"
      maxWidth="sm:max-w-2xl"
      leftButton={<div></div>}
      rightButton={
        <Button
          variant="outline"
          type="submit"
          form="add-learning-form"
          className="border-[#1c398e] text-[#1c398e] hover:bg-[#1c398e] hover:text-white"
        >
          Publish
        </Button>
      }
    >
      <form
        id="add-learning-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="space-y-2">
          <Label>Title</Label>

          <Input
            placeholder="What did you learn today?"
            {...register("title", {
              required: "Title is required",
            })}
          />

          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Description</Label>

          <Textarea
            rows={8}
            className="h-48 resize-none overflow-y-auto"
            placeholder="Share your learning..."
            {...register("description", {
              required: "Description is required",
            })}
          />

          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
      </form>
    </CommonDialog>
  );
}
