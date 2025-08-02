import React, { useState, useEffect } from "react";
import { PlusCircle, ImagePlus, Upload , DeleteIcon, Edit} from "lucide-react";
import schema from "../../Validations/CategoryRegistrationForm";
import { createCategory} from '../../services/Admin/Dashboard';
import { toast } from "react-toastify";
import { TCategory, TCategoryData } from "../../types/categoryTypes";
import Table from '../common/Table';
import { fetchAllCategory, deleteCategoryById , editCategoryById, uploadImageCategoryEdit} from "../../services/Admin/Dashboard";
import { Columns_Category } from "../../Constants/User";
import { PER_PAGE } from "../../Constants/User";
import Pagination from "../layout/Shared/Pagination";
import Swal from 'sweetalert2';
import Modal from '../common/Modal';
import SearchFilter from '../layout/Shared/SearchFilter';
import { ValidationError } from "yup";
import  useSweetAlert  from '../../hooks/CustomHooks/SweetAlert';

const Category: React.FC = () => {
  const [ isModalOpen, setIsModal] = useState<boolean>(false);
  const [ currentPage, setCurrentPage] = useState(1);
  const [ count, setCount ] = useState<number>(0);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [image, setImage] = useState<File | null >(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ isImageUpdate, setIsImageUpdate ] = useState<boolean>(false);
  const [category, setCategory ] = useState<TCategory[]>([]);
  const [ isEdit, setIsEdit ] = useState<boolean>(false);
  const [ filters, setFilters ] = useState({keyword:'', sortOrder: ''});
  const [ editData, setEditData] = useState({
      _id:'',
      name:'',
      description:'',
      image:'',
  });
  const { showSuccess ,showError } = useSweetAlert();
  const handlePage = async (page: number) =>{
     setCurrentPage(page);
  }
 const initializeState = () =>{
  setErrors({});
  setName("");
  setDescription("");
  setImage(null);
  setImagePreview(null);
  setIsCreate(false);
 }
 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsImageUpdate(true);
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };
  useEffect(() => {
    fetchData(currentPage); 
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [currentPage,filters]);
  
  const fetchData = async (page: number) =>{
       const data = await fetchAllCategory(
        {
          page,
          perPage:PER_PAGE, 
          search: filters.keyword,
          sortBy: 'name',
          sortOrder : filters.sortOrder,
       }
      );
       if(data){
         setCategory(data?.data?.data);
         setCount(data?.data?.totalCount)
      }
   }
  const handleCancel = () =>{
    setIsCreate(false);
  } 
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const updataCategory = (id: string) =>{
      console.log('Updata category !!');
      setCategory((prev) =>
          prev.map((category) => 
             category._id === id ? { ...category, status:!category.status}: category
       )
     ) 
 }
  const deleteCategory = async(id :string) =>{
    console.log("ID deleted :: ", id);
    Swal.fire({
      title: "Are you sure you want to delete this category?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete", 
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteCategoryById(id); 
          updataCategory(id);
          console.log("Response :: ",res);
          if (res) {
             showSuccess("Category Deleted Successfully","Category");
          } else {
             showError("Error occured !"," Error");
          }
        } catch (err: unknown) {
          console.error("Error deleting category:", err);
           showError("Failed to delete Category !","Error !");
        }
      }
    });
  };
  const editCategory = async(category: TCategory) =>{
     console.info('Edit Category :::',category);
     setIsModal(true);
     setIsEdit(true);
     setEditData(category);
     setImagePreview(category.image);
  } 
  const toggleModal = () =>{
     setIsModal(!isModalOpen);
  }
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
     e.preventDefault();
     try{
         setIsModal(false);
         if(image){ 
            const url= await uploadImageCategoryEdit(image)
            editData.image =url;
         }
         await schema.validate({ name:editData.name, description:editData.description, image }, { abortEarly: false });
         const categoryEditData : TCategory = {
            _id:editData._id,
            name: editData.name,
            description: editData.description,
            status:true,
            image:editData.image
         }
         console.log(' Category Edit Category ::',categoryEditData);
         const response = await editCategoryById(categoryEditData);
         if(response){
           toast.success("Category successfully Edited !");
          }else{
             toast.error("Error in Edit Category !!");
          }
         console.log("REsponse is ",response);
         setImagePreview(null);
         initializeState();
     }catch(err : unknown){
      if (err instanceof ValidationError) {
         const newErrors: Record<string, string> = {};
         err.inner.forEach((e) => {
          newErrors[e.path as string] = e.message;
        });
        setErrors(newErrors);
      }
     }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsModal(false);
      await schema.validate({ name, description, image }, { abortEarly: false });
      console.log("Form Submitted Successfully!");
      if (!(image instanceof File)) {
        setErrors((prev) => ({ ...prev, image: "Please upload a valid image file." }));
        return;
      }
      const category : TCategoryData = {
          name,
          description,
          image
      }
      const response = await createCategory(category);
      if(response){
         toast.success("Successfully created category !!");
      }else{
         toast.error("Category already Exist !!");
      }
      initializeState();
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          newErrors[e.path as string] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };
  return (
    <>
      <button
        className="relative flex items-center gap-3 px-8 py-4 text-lg font-semibold transition-all duration-300 bg-black rounded-full shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-700"
        onClick={() => setIsCreate(true)}
      >
        <PlusCircle size={20} color={"white"} />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          CREATE
        </span>
      </button>
      { !isCreate && 
      <>
      <SearchFilter onFilterChange={setFilters} />
      <Table<TCategory> 
                data={category}
                columns= {Columns_Category}
                role ={"Category"}
                renderActions={ (data) => (
                 <>
                  <div className="flex flex-row py-5"> 
                     <button
                        onClick = {()=> deleteCategory(data._id)}
                        className="m-2 shadow-md">
                        <DeleteIcon  size={24} />  
                     </button>
                     <button
                         className="m-2 shadow-md"
                        onClick= { ()=> editCategory(data)}
                     >
                      <Edit size={24} />
                     </button> 
                   </div>    
                </>
             )
           }
      />
      <div className="flex justify-center mt-6"> 
      <Pagination 
            perPage={PER_PAGE}
            length={count || 1}
            handlePage={handlePage}
            currentPage={currentPage}
       />
       </div> 
       </>      
      }
      {isCreate && (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create Category</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter category name"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Description</label>
              <textarea
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Enter category description"
                rows={3}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
              {errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>

           <div>
              <label className="block text-gray-600 font-medium mb-2">Upload Photo</label>
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-400">
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="h-24 w-24 rounded-lg object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <ImagePlus className="w-10 h-10" />
                    <span className="text-sm mt-2">Click to upload</span>
                  </div>
                )}
              </label>
              {errors.image && <p className="text-red-500">{errors.image}</p>}
            </div>
           <button
              type="submit"
              className="w-40 py-3 justify-center text-md font-semibold text-white bg-black rounded-full shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-pink-300"
            >
              <Upload className="inline-block w-5 h-5 mr-2" />
              Submit
            </button>
            <button onClick={handleCancel} className="w-40 ml-7 py-3 justify-center text-md font-semibold text-white bg-black rounded-full shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-pink-300"> Cancel</button>
          </form>
        </div>
       )}
      {
        isEdit && (
            <Modal
                  isOpen={isModalOpen}
                  closeModal={toggleModal}
                  title="Edit Category"
           >
          <form className="space-y-5" onSubmit={handleEditSubmit}>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleEditChange}
                value={editData.name}
                placeholder="Enter category name"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Description</label>
              <textarea
                name="description"
                onChange={handleEditChange}
                value={editData.description}
                placeholder="Enter category description"
                rows={3}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
              {errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>

           <div>
              <label className="block text-gray-600 font-medium mb-2">Upload Photo</label>
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-400">
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                {isImageUpdate ?
                   (<img src={imagePreview ?? undefined} alt="Preview" className="h-24 w-24 rounded-lg object-cover" />) :
                   (
                  <>  
                    <img src={editData.image} alt="Preview" className="h-24 w-24 rounded-lg object-cover" />
                    <span className="text-sm mt-2">Click to upload</span>
                  </>
                )}
                
              </label>
              {errors.image && <p className="text-red-500">{errors.image}</p>}
            </div>
            <button
              type="submit"
              className="w-40 py-3 justify-center text-md font-semibold text-white bg-black rounded-full shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-pink-300"
            >
            <Upload className="inline-block w-5 h-5 mr-2" />
              Submit
            </button>

            <button onClick={handleCancel} className="w-40 ml-7 py-3 justify-center text-md font-semibold text-white bg-black rounded-full shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-pink-300"> Cancel</button>
          </form>
        </Modal>
         )
      }
    </>
  );
};

export default Category;
