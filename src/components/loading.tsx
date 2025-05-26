const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent dark:border-t-black animate-spin border-black dark:border-white" />

        <div className="absolute inset-2 rounded-full bg-black dark:bg-white flex items-center justify-center">
          <span className="text-white dark:text-black font-bold text-sm">DEV-J</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
