const HomeLoading = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-6 min-h-screen bg-gray-100 p-4">
      {}
      <div className="h-[716px] bg-gray-300 rounded-lg max-[768px]:h-[400px]"></div>

      {}
      <div className="flex flex-col items-center space-y-6">
        <div className="h-6 w-48 bg-gray-300 rounded-lg mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1240px] w-full">
          <div className="h-[350px] w-full bg-gray-300 rounded-lg sm:h-[300px] max-[640px]:h-[250px]"></div>
          <div className="h-[350px] w-full bg-gray-300 rounded-lg sm:h-[300px] max-[640px]:h-[250px]"></div>
          <div className="h-[350px] w-full bg-gray-300 rounded-lg sm:h-[300px] max-[640px]:h-[250px]"></div>
        </div>
      </div>

      {}
      <div className="flex flex-col space-y-6">
        <div className="h-6 w-48 bg-gray-300 rounded-lg"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-[768px]:grid-cols-2 max-[640px]:grid-cols-1">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-48 bg-gray-300 rounded-lg max-[640px]:h-40"
            ></div>
          ))}
        </div>
      </div>

      {}
      <div className="flex flex-col space-y-6">
        <div className="h-6 w-64 bg-gray-300 rounded-lg"></div>
        <div className="h-[482px] bg-gray-300 rounded-lg max-[768px]:h-[350px] max-[640px]:h-[300px]"></div>
        <div className="grid grid-cols-2 gap-4 max-[768px]:grid-cols-1">
          <div className="h-[386px] bg-gray-300 rounded-lg max-[640px]:h-[300px]"></div>
          <div className="h-[386px] bg-gray-300 rounded-lg max-[640px]:h-[300px]"></div>
        </div>
      </div>

      {}
      <div className="w-full h-40 bg-gray-300 rounded-lg max-[640px]:h-32"></div>
    </div>
  );
};

export default HomeLoading;
