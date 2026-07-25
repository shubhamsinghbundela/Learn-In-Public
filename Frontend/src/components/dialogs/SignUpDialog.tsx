import { useForm } from "react-hook-form";
import CommonDialog from "@/components/common/CommonDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupUser } from "@/api/api";
import { showToast } from "@/utils/toast";
import { useLoadingStore } from "@/store/loadingStore";

interface SignUpForm {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignInClick?: () => void;
}

export default function SignUpDialog({
  open,
  onOpenChange,
  onSignInClick,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpForm>();

  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  const onSubmit = async (data: SignUpForm) => {
    try {
      startLoading();

      await signupUser(data);

      showToast.success("Account Created", "You can now sign in.");

      reset();
      onOpenChange(false);
      if (onSignInClick) {
        onSignInClick();
      } else {
        onOpenChange(false);
      }
    } catch (err: any) {
      console.log(err);
      showToast.error("Signup Failed", "Something went wrong");
    } finally {
      stopLoading();
    }
  };

  return (
    <CommonDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Account"
      maxWidth="sm:max-w-lg"
      leftButton={
        <Button
          variant="ghost"
          className="text-[#1c398e] hover:text-[#1c398e]"
          onClick={onSignInClick}
        >
          Already have an account?
        </Button>
      }
      rightButton={
        <Button
          type="submit"
          form="signup-form"
          className="bg-[#1c398e] hover:bg-[#162d72]"
        >
          Sign Up
        </Button>
      }
    >
      <form
        id="signup-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              placeholder="John"
              {...register("firstName", {
                required: "First name is required",
              })}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              placeholder="Doe"
              {...register("lastName", {
                required: "Last name is required",
              })}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Username</Label>
          <Input
            placeholder="johndoe"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="********"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
      </form>
    </CommonDialog>
  );
}
