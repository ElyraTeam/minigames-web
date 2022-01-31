interface SpinnerProps { }

const Spinner: React.FC<SpinnerProps> = ({ }) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="loader" />
    </div>
  )
};

export default Spinner;
