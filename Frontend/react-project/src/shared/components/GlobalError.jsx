import { useDispatch, useSelector } from "react-redux";
import { removeError } from "../state/errorSlice";

const GlobalError = () => {
  let dispatch = useDispatch();
  let { error } = useSelector((store) => store.error);

  if (!error) return null;

  setTimeout(() => {
    dispatch(removeError());
  }, 3000);

  return (
    <div className="absolute bottom-20 z-10 right-20">
      <h1 className="text-white text-6xl py-2 px-4 rounded bg-red-700 font-semibold">
        {error}
      </h1>
    </div>
  );
};

export default GlobalError;