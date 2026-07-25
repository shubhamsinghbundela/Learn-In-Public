import { useForm } from "react-hook-form";

import CommonDialog from "@/components/common/CommonDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoadingStore } from "@/store/loadingStore";
import { showToast } from "@/utils/toast";
import { createGoal } from "@/api/api";

interface CreateGoalForm {
  title: string;
  description: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateGoalDialog({ open, onOpenChange }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGoalForm>();

  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const onSubmit = async (data: CreateGoalForm) => {
    try {
      startLoading();

      await createGoal(data);

      showToast.success(
        "Goal Created",
        "Your goal has been created successfully.",
      );

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
      title="Create Goal"
      maxWidth="sm:max-w-xl"
      leftButton={<div />}
      rightButton={
        <Button
          type="submit"
          form="create-goal-form"
          variant="outline"
          className="border-[#1c398e] text-[#1c398e] hover:bg-[#1c398e] hover:text-white"
        >
          Create Goal
        </Button>
      }
    >
      <form
        id="create-goal-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="space-y-2">
          <Label>Goal Title</Label>

          <Input
            placeholder="Master React Hooks"
            {...register("title", {
              required: "Goal title is required",
            })}
          />

          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Description</Label>

          <textarea
            rows={5}
            placeholder="Describe your goal..."
            {...register("description")}
          />
        </div>
      </form>
    </CommonDialog>
  );
}
