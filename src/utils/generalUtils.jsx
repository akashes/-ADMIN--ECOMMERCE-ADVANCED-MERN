import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { deleteCategory, getCategories } from '../features/category/categorySlice';


export const useConfirmationToast = () => {
  const dispatch = useDispatch();

  const showConfirmationToast = (categoryId,name) => {
    toast.custom((t) => (
      <div
        className={`bg-white p-4 shadow-md rounded-md border ${
          t.visible ? 'animate-enter' : 'animate-leave'
        }`}
      >
        <p className="text-black font-semibold mb-2">Are you sure?</p>
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => {
              toast.dismiss(t.id); // close the toast
              dispatch(deleteCategory(categoryId)) // 🔥 dispatch your action
                .unwrap()
                .then(() => {

                  toast.success(` Category ${name} deleted successfully`);
                  dispatch(getCategories())
                })
                .catch(() => toast.error('Delete failed'));
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    ));
  };

  return showConfirmationToast;
};
