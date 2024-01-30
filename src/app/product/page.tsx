'use client'

import { Add, Cancel, Delete, Edit } from "@mui/icons-material";
import { Button, Dialog, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiCallFunction } from "../utils/common";
import { useEffect, useState } from "react";
import { Locations, Products } from "../types/type";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {

    const [allProducts, setAllProducts] = useState<Products[]>([]);
    const [allLocations, setAllLocations] = useState<Locations[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteProduct, setDeleteProduct] = useState(false);
    const [deketeModal, setDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState<Products>();
    const router = useRouter();

    useEffect(() => {
        getAllProducts();
        getAllLocations();
    }, []);

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const response = await apiCallFunction('GET', 'products');
            if (response.status == 200) {
                setAllProducts(response.data);
                setTimeout(() => setLoading(false), 1000);
            }
            else {
                setLoading(false);
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
        }
        catch (error: any) {
            toast.error(error.message, {
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

    const getAllLocations = async () => {
        setLoading(true);
        const response = await apiCallFunction('GET', 'locations');
        if (response.status == 200) {
            setLoading(false);
            setAllLocations(response.data);
        }
        else {
            setLoading(false);
            toast.error('Something went wrong while fetching locaiton data', {
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

    const handleDeleteProduct = async (item: Products) => {
        setDeleteItem(item);
        setDeleteModal(true);
    };

    const confirmDelete = async () => {
        setLoading(true);
        const response = await apiCallFunction(
            'DELETE',
            `products/${deleteItem?.id}`
        );
        if (response.status == 200) {
            setLoading(false);
            toast.error('Product deleted successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            getAllProducts();
            setDeleteModal(false);
        }
        else {
            toast.error('Something went wrong while deleting product', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setDeleteModal(false);

            setLoading(false);
        }
    }

    const getLocationNameById = (locaiton: any) => {
        const location_data: Locations[] = allLocations.filter((element: Locations, id) => element.id == locaiton.locationId);
        if (location_data.length > 0) return location_data[0].location_name
        else return "";
    }

    return (
        <div className="flex flex-col mt-10 h-full w-full">
            <div className="flex flex-row justify-between mx-10">
                <p className="text-black mt-10 text-3xl">Product List</p>
                <div className="mt-10">
                    <button className="border border-blue-200 hover:bg-blue-400 w-[120px] rounded">
                        <Link
                            href={'product/addproduct'}>
                            <p className="text-lg text-blue-500 hover:text-white px-3 py-2">
                                <Add />Add </p>
                        </Link>
                    </button>
                </div>
            </div>

            <div className="relative overflow-x-auto m-10">
                {
                    loading ?
                        <div className="flex h-[600px] w-full flex-row justify-center items-center">
                            <p>Loading...</p>
                        </div>
                        :
                        <Table className="border-2 ">
                            <TableHead className="bg-zinc-700">
                                <TableRow>
                                    <TableCell className="font-semibold">
                                        <p className="text-white">Sr No.</p>
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        <p className="text-white">Image</p>
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        <p className="text-white">Product Name</p>
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        <p className="text-white">Price</p>
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        <p className="text-white">Type</p>
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        <p className="text-white">Quantity</p>
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        <p className="text-white text-center">Action</p>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="bg-white">
                                {
                                    allProducts.length > 0 ?
                                        allProducts
                                            .sort((a: Products, b: Products) => {
                                                return a.name.localeCompare(b.name);
                                            })
                                            .map((item: Products, index) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>
                                                            <img
                                                                src={item.productImages[0] ? item.productImages[0].image : "../assets/product_image.png"}
                                                                className="h-36 w-36"
                                                                style={{ height: "144px", width: "144px" }}
                                                                alt="PRODUCT_IMAGE"
                                                            />
                                                        </TableCell>
                                                        <TableCell>{item.name}</TableCell>
                                                        <TableCell>{item.price}</TableCell>
                                                        <TableCell>{item.type == 1 ? "Returnable" : "Not Returnable"}</TableCell>
                                                        <TableCell>
                                                            {item.productLocations.length > 0 ? <Table className="border">
                                                                <TableHead>
                                                                    <TableCell className="font-semibold">Location</TableCell>
                                                                    <TableCell className="font-semibold">Quantity</TableCell>
                                                                </TableHead>
                                                                {
                                                                    item.productLocations.map((location, id) => {
                                                                        return (
                                                                            <TableRow>
                                                                                <TableCell>{getLocationNameById(location)}</TableCell>
                                                                                <TableCell>{location.qty}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    })
                                                                }
                                                            </Table>
                                                                :
                                                                "--"
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-col justify-center items-center">
                                                                <button
                                                                    onClick={() => router.push(`/product/editproduct?id=${item.id}`)}
                                                                    className="border mb-5 border-green-200 hover:bg-green-400 w-[120px] rounded"
                                                                >
                                                                    <p className="text-lg text-green-500 hover:text-white px-3 py-2">
                                                                        <Edit className="mr-2" /> Edit
                                                                    </p>
                                                                </button>
                                                                <button onClick={() => handleDeleteProduct(item)} className="border border-red-200 w-[120px] hover:bg-red-400 rounded">
                                                                    <p className="text-lg text-red-500 hover:text-white px-3 py-2">
                                                                        <Delete className="mr-2" />Delete
                                                                    </p>
                                                                </button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        :
                                        <TableRow >
                                            <TableCell className="text-center" colSpan={7}>
                                                There isn't any product added Try adding product by clicking above "Add"
                                            </TableCell>
                                        </TableRow>
                                }
                            </TableBody>
                        </Table>
                }
            </div>
            <ToastContainer />
            <div>
                <Dialog
                    open={deketeModal}
                    onClose={() => setDeleteModal(false)}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle className="bg-zinc-700 text-white" id="form-dialog-title">
                        Delete Product
                    </DialogTitle>
                    <p className="text-center my-10 text-xl">Are you sure you want to delete this product?</p>
                    <div className="flex mb-10 flex-row justify-center items-center">
                        <button onClick={() => setDeleteModal(false)} className="border mx-2 border-green-200 hover:bg-green-400 w-[120px] rounded" >
                            <p className="text-lg text-green-500 hover:text-white px-3 py-2">
                                <Cancel className="mr-2" />Cancel
                            </p>
                        </button>
                        <button onClick={() => { setDeleteProduct(true), confirmDelete() }} className="border mx-2 border-red-200 w-[120px] hover:bg-red-400 rounded">
                            <p className="text-lg text-red-500 hover:text-white px-3 py-2">
                                <Delete className="mr-2" />Delete
                            </p>
                        </button>
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default ProductList;