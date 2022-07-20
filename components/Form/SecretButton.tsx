
const SecretButton = () => {
    return (
      <button
        type="submit"
        className="
                    w-full
                    rounded
                    bg-blue-600
                    px-6
                    py-2.5
                    text-xl
                    font-bold
                    uppercase
                    leading-tight
                    text-white
                    shadow-md
                    transition duration-150
                    ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                    focus:shadow-lg focus:outline-none
                    focus:ring-0
                    active:bg-blue-800
                    active:shadow-lg
                  "
      >
        Create Secret
      </button>
    );
  };

  export default SecretButton;