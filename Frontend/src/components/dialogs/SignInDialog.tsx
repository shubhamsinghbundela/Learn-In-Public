import { useForm } from "react-hook-form";
import CommonDialog from "@/components/common/CommonDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/userStore";
import { showToast } from "@/utils/toast";
import { signinUser } from "@/api/api";
import { useLoadingStore } from "@/store/loadingStore";
import { setAccessToken } from "@/utils/token";

interface SignInForm {
  username: string;
  password: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateAccount?: () => void;
}

export default function SignInDialog({
  open,
  onOpenChange,
  onCreateAccount,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInForm>();

  const addUser = useUserStore((state) => state.addUser);
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const onSubmit = async (data: SignInForm) => {
    try {
      startLoading();
      const res = await signinUser(data);
      addUser(res.data.user);

      setAccessToken(res.data.accessToken);

      showToast.success(
        "Login Successful",
        `Welcome back ${res.data.user.firstName}!`,
      );

      reset();
      onOpenChange(false);
    } catch (err: any) {
      showToast.error(
        "Login Failed",
        err.response?.data?.message ?? "Invalid credentials",
      );
    } finally {
      stopLoading();
    }
  };

  return (
    <CommonDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Sign In"
      leftButton={
        <Button onClick={onCreateAccount} variant="ghost">
          Create New Account
        </Button>
      }
      rightButton={
        <Button
          variant="outline"
          type="submit"
          form="signin-form"
          className="border-[#1c398e] text-[#1c398e] hover:bg-[#1c398e] hover:text-white"
        >
          Sign In
        </Button>
      }
    >
      <form
        id="signin-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Username</Label>

            <Input
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
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>
      </form>
    </CommonDialog>
  );
}
