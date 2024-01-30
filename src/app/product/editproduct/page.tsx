'use client'

import { LocaitonArray, Locations, Products } from "@/app/types/type";
import { apiCallFunction } from "@/app/utils/common";
import { Add, ArrowBack, Close, Remove } from "@mui/icons-material";
import { FormControl, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {

    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();

    const [imgsSrc, setImgsSrc] = useState<any>([]);
    const [imgsFile, setImgsFile] = useState<any>([]);
    const [locations, setLocations] = useState<Locations[]>([]);
    const [loading, setLoading] = useState(true);
    const [quantityData, setQuantityData] = useState([
        {
            location_name: "",
            location_id: null,
            quantity: null,
            id: 1
        }
    ]);
    const [productData, setProductData] = useState<Products>({
        name: "",
        price: 0,
        type: 1,
        id: 0,
        created_at: "",
        updated_at: "",
        productImages: [],
        productLocations: [],
    });

    const [nameError, setNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [typeError, setTypeError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);
    const [locationError, setLocationError] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        getProductData();
    }, []);

    const getProductData = async () => {
        setLoading(true);

        // GET LOCATIONS
        const location_response = await apiCallFunction('GET', 'locations');
        if (location_response.status == 200) {
            setLocations(location_response.data);
            setTimeout(() => { setLoading(false) }, 500)
        }
        else {
            setLoading(false);
            toast.error(location_response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        //GET PRODUCT BY ID
        const response = await apiCallFunction('GET', `products/${id}`);
        if (response.status == 200) {

            setProductData(response.data);
            setTimeout(() => { setLoading(false) }, 1000)

            if (response.data.productLocations.length > 0) {
                const temp_location_array =
                    response.data.productLocations.map((item: LocaitonArray, index: any) => {
                        return {
                            location_name: getLocationNameById(item, location_response.data),
                            location_id: item.locationId,
                            id: item.id,
                            quantity: item.qty
                        }
                    })
                setQuantityData(temp_location_array);
            }

            response.data.productImages.length > 0 && setImgsSrc(response.data.productImages)
            // response.data.productImages.length > 0 && setImgsFile(response.data.productImages)
        }
        else {
            setLoading(false)
            toast.error('Something went wrong while fetching product data', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const onImageSelect = (e: any) => {
        setImageError(false);
        for (const file of e.target.files) {
            setImgsFile((prev: any) => ([...prev, e.target.files[0]]));
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImgsSrc((imgs: any) => [...imgs, reader.result]);
            };
            reader.onerror = () => {
                console.log(reader.error);
            };
        }
    };

    const onImageDelete = (index: number) => {
        const filteredArray_file = imgsFile.filter((item: any, id: number) => id !== index);
        const filteredArray_src = imgsSrc.filter((item: any, id: number) => id !== index);
        setImgsFile(filteredArray_file);
        setImgsSrc(filteredArray_src);
    };

    const handleChange = (e: any) => {
        setNameError(false);
        setPriceError(false);
        setTypeError(false);
        const { value, name } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const addMoreLocation = () => {
        setQuantityData((prev) => ([
            ...prev, {
                location_name: "",
                id: quantityData[quantityData.length - 1].id + 1,
                quantity: null,
                location_id: null
            }
        ]))
    };

    const handleRemoveLocation = (item: any, id: number) => {
        const temp_array = quantityData.filter((items, index) => index !== id);
        setQuantityData(temp_array);
    };

    const handleChangeQuantityAndLocation = (e: any, item: any, isQuantity: Boolean) => {
        const temp_array: any = quantityData.map((element, id) => {
            if (element.id == item.id) {
                const filter_location = locations.filter((item, id) => item.location_name == e.target.value);
                if (isQuantity) {
                    return {
                        location_name: item.location_name,
                        location_id: element.location_id,
                        id: item.id,
                        quantity: e.target.value > 0 ? parseInt(e.target.value) : 0,
                    }
                }
                else {
                    return {
                        location_name: e.target.value,
                        location_id: filter_location[0].id,
                        id: item.id,
                        quantity: item.quantity,
                    }
                }
            }
            else {
                return {
                    location_name: element.location_name,
                    location_id: element.location_id,
                    id: element.id,
                    quantity: element.quantity,
                }
            }
        })

        setQuantityData(temp_array);
    };

    const validate = () => {
        if (productData.name.length == 0) {
            setNameError(true);
            return false;
        }
        else if (productData.price == 0) {
            setPriceError(true);
            return false;
        }
        else if (productData.type == null || productData.type > 1) {
            setTypeError(true);
            return false;
        }
        else if (quantityData) {
            let returns;
            quantityData.map((item) => {
                if (item.location_name == "" || item.location_name == null) {
                    setLocationError(true);
                    return returns = false;
                }
                else if (item.quantity == 0 || item.quantity == null) {
                    setQuantityError(true);
                    return returns = false;
                }
                else return returns = true;
            })
            return returns;
        }
        else return true;
    };

    const getLocationNameById = (locaiton: any, locaitonList: Locations[]) => {
        const location_data: Locations[] = locaitonList.filter((element: Locations, id) => element.id == locaiton.locationId);
        if (location_data.length > 0) return location_data[0].location_name
        else return "";
    };

    const handleEditProduct = async () => {
        if (validate()) {
            setLoading(true);
            const locationQty = quantityData.map((item, id) => {
                return {
                    locationId: item.location_id,
                    qty: item.quantity
                }
            });
            let formData = new FormData();

            formData.append("name", productData.name);
            formData.append("price", productData.price.toString());
            formData.append("type", productData.type ? productData.type.toString() : "0");
            formData.append("locationQty", JSON.stringify(locationQty));
            imgsFile.forEach((files: any) => {
                formData.append("images", files);
            });
            const response = await apiCallFunction(
                'PATCH',
                `products/${id}`,
                formData
            )
            if (response.status == 200) {
                router.back();
            }
            else {
                setLoading(false);
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    };

    return (
        <div className="flex flex-col py-10 min-h-screen w-full bg-gray-100">
            <div className="bg-white mx-10 shadow-md">
                <div className="flex flex-row justify-start mt-10 items-center mx-10">
                    <button onClick={() => router.back()}><ArrowBack className="h-7 w-7 mr-3" /></button>
                    <p className="text-black text-2xl">Edit Product</p>
                </div>
                {
                    loading ?
                        <div className="h-[600px] flex flex-row justify-center items-center">
                            <p>Loading...</p>
                        </div>
                        :
                        <>
                            <div className="m-10">
                                <>
                                    <label htmlFor="event-image">
                                        <div className="border items-center justify-center flex border-gray-300 text-gray-500 w-fit px-2 py-2 rounded">
                                            <Add />
                                            Product Image
                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        id={`event-image`}
                                        style={{ display: "none" }}
                                        onChange={(e) => onImageSelect(e)}
                                        multiple
                                    // disabled={imgsSrc.length == 5}
                                    />
                                    <div className="flex flex-row justify-start items-center">
                                        {imgsSrc.map((link: any, index: number) => (
                                            <div className="">
                                                <img
                                                    src={link.image ? link.image : link}
                                                    className="h-36 w-36 mt-5 mx-5 rounded-full object-cover object-top"
                                                />
                                                {/* <button onClick={() => onImageDelete(index)}> <Close className="relative bottom-[135px] left-[135px] bg-gray-100 rounded-full" /></button> */}
                                            </div>
                                        ))}
                                    </div>
                                </>
                                <div className={"mt-5"}>
                                    <TextField
                                        margin="dense"
                                        label="Product Name"
                                        type="text"
                                        name="name"
                                        className="w-full"
                                        autoComplete="off"
                                        value={productData.name}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {
                                        nameError &&
                                        <p className="text-red-500 text-sm">*please check name field</p>
                                    }
                                </div>

                                <div className="flex lg:flex-row sm:flex-col justify-start items-center lg:mr-5">
                                    <div className="mt-5 w-full">
                                        <TextField
                                            margin="dense"
                                            label="Product Price"
                                            type="text"
                                            name="price"
                                            className="w-full"
                                            autoComplete="off"
                                            value={productData.price}
                                            onChange={(e) => handleChange(e)}
                                        />
                                        {
                                            priceError &&
                                            <p className="text-red-500 text-sm">*price must be greater than 0</p>
                                        }
                                    </div>
                                    <div className="mt-5 w-full">
                                        <FormControl className="w-full lg:ml-5" variant="outlined" sx={{ minWidth: 160, Width: 160 }}>
                                            <InputLabel id="demo-simple-select-standard-label" >Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                value={productData.type}
                                                label="Type"
                                                name="type"
                                                onChange={(e) => handleChange(e)}
                                            >
                                                <MenuItem value={1}>Returnable</MenuItem>
                                                <MenuItem value={0}>Not Returnable</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {
                                            typeError &&
                                            <p className="text-red-500 text-sm">*please select type</p>
                                        }
                                    </div>
                                </div>

                                {/* To add location and quantity */}
                                {
                                    quantityData.map((item, id) => {
                                        return (
                                            <div className="mt-5 flex flex-row justify-start items-center" >
                                                <div className="w-1/3 mr-5">
                                                    <FormControl className="w-full" variant="outlined" sx={{ minWidth: 160, Width: 160 }}>
                                                        <InputLabel id="demo-simple-select-standard-label">Location</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            value={quantityData[id].location_name}
                                                            label="Location"
                                                            onChange={(e) => handleChangeQuantityAndLocation(e, item, false)}
                                                            name="location"
                                                        >
                                                            {
                                                                locations && locations.map((item: Locations, index) => {
                                                                    return (
                                                                        <MenuItem value={item.location_name}>{item.location_name}</MenuItem>
                                                                    )
                                                                })}
                                                        </Select>
                                                    </FormControl>
                                                    {
                                                        locationError &&
                                                        <p className="text-red-500 text-sm">*please select location</p>
                                                    }
                                                </div>
                                                <div className="w-1/3 ">
                                                    <TextField
                                                        margin="dense"
                                                        label="Quantity"
                                                        type="text"
                                                        name="quantity"
                                                        className="w-full"
                                                        autoComplete="off"
                                                        value={quantityData[id].quantity}
                                                        onChange={(e) => handleChangeQuantityAndLocation(e, item, true)}
                                                    />
                                                    {
                                                        quantityError &&
                                                        <p className="text-red-500 text-sm">*please add quantity</p>
                                                    }
                                                </div>
                                                {
                                                    quantityData.length > 1 &&
                                                    <div className="w-[100px] rounded text-center mx-10 bg-red-100 ">
                                                        <button onClick={() => handleRemoveLocation(item, id)} className="text-red-500">
                                                            <p><Remove />Remove</p>
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                                <div className="flex justify-start items-start">
                                    <button onClick={addMoreLocation} className=" rounded">
                                        <p className="py-3 text-blue-500"><Add />Add more</p>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-row justify-end items-end mx-10 mb-10">
                                <button onClick={() => handleEditProduct()} className="border bg-zinc-700 w-[120px] rounded">
                                    <p className="text-lg text-white px-3 py-2">
                                        Edit
                                    </p>
                                </button>
                            </div>
                        </>
                }
            </div>
            <ToastContainer />
        </div >
    )
}
export default EditProduct;