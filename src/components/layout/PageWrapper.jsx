const PageWrapper = ({ children }) => {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
