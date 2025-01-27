const HomeLoading = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-6 min-h-screen bg-gray-100 p-4">
      {}
      <div className="h-64 bg-gray-300 rounded-lg max-[768px]:h-48 max-[480px]:h-36"></div>

      {}
      <div className="flex flex-col items-center space-y-4">
        <div className="h-6 w-48 bg-gray-300 rounded-lg mb-4"></div>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="h-40 w-40 bg-gray-300 rounded-lg max-[768px]:h-32 max-[768px]:w-32 max-[480px]:h-24 max-[480px]:w-24"></div>
          <div className="h-40 w-40 bg-gray-300 rounded-lg max-[768px]:h-32 max-[768px]:w-32 max-[480px]:h-24 max-[480px]:w-24"></div>
          <div className="h-40 w-40 bg-gray-300 rounded-lg max-[768px]:h-32 max-[768px]:w-32 max-[480px]:h-24 max-[480px]:w-24"></div>
        </div>
      </div>

      {}
      <div className="flex flex-col">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-48 bg-gray-300 rounded-lg max-[768px]:h-40 max-[480px]:h-32"
            ></div>
          ))}
        </div>
      </div>

      {}
      <div className="flex flex-col space-y-4 items-center">
        <div className="h-6 w-64 bg-gray-300 rounded-lg max-[480px]:w-48"></div>
        <div className="h-40 bg-gray-300 rounded-lg max-[768px]:h-32 max-[480px]:h-24"></div>
        <div className="h-40 bg-gray-300 rounded-lg max-[768px]:h-32 max-[480px]:h-24"></div>
      </div>
    </div>
  );
};

export default HomeLoading;
