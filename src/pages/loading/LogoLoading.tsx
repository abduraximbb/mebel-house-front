import logo from "@/assets/logo.png";

const LogoLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <img
        src={logo}
        alt="Loading..."
        className="animate-spin [animation-duration:1.8s] w-24 h-24"
      />
    </div>
  );
};

export default LogoLoading;
