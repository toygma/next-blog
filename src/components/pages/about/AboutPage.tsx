"use client";
const AboutPage = () => {
  return (
    <div className="mt-8">
      <div>
        <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Welcome to my website! I am committed to providing you with the best content and resources.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-screen-xl px-4 py-4">
        <div className="bg-black">
          Grid1
        </div>
        <div className="bg-gray-400">
          Grid2
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
