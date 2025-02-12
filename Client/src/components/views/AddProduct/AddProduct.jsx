import { useForm } from 'react-hook-form'

export function AddProductPanel({ back, save }) {
    const { register, handleSubmit } = useForm()
    return (
        <div className="Sign">
            <div>
                <h3>Wellcome Admin</h3>
                <h5>You can add a new product from this form</h5>
            </div>
            <form onSubmit={handleSubmit(save)} className="my-5">
                <div className="form-group my-lg-3">
                    <label>Name</label>
                    <input
                        type="text" className="form-control" placeholder="Ingresa el nombre del producto"
                        {...register("name", { required: true })}
                        onInvalid={e => e.target.setCustomValidity("El campo Nombre no puede estar vacio")}
                        onInput={e => e.target.setCustomValidity('')}
                        required />
                </div>
                <div className="form-group my-lg-3">
                    <label>Description</label>
                    <input
                        type="text" className="form-control" placeholder="Ingresa la descripcion del producto"
                        {...register("description", { required: true })}
                        onInvalid={e => e.target.setCustomValidity("Ingresa la descripcion")}
                        onInput={e => e.target.setCustomValidity('')}
                        required />
                </div>
                <div className="form-group my-lg-3">
                    <label>Code</label>
                    <input
                        type="text" className="form-control" placeholder="Ingresa el codigo del producto"
                        {...register("code", { required: true })}
                        onInvalid={e => e.target.setCustomValidity("Ingresa el codigo")}
                        onInput={e => e.target.setCustomValidity('')}
                        required />
                </div>
                <div className="form-group my-lg-3">
                    <label>Category</label>
                    <input
                        type="text" className="form-control" placeholder="Ingresa la categoria del producto"
                        {...register("category", { required: true })}
                        onInvalid={e => e.target.setCustomValidity("Ingresa la categoria")}
                        onInput={e => e.target.setCustomValidity('')}
                        required />
                </div>
                <div className="form-group my-lg-3">
                    <label>Photo</label>
                    <input
                        type="file" className="form-control" placeholder="Ingresa el Precio"
                        {...register("photo", { required: true })}
                        onInvalid={e => e.target.setCustomValidity("Ingresa el Precio")}
                        onInput={e => e.target.setCustomValidity('')}
                        required />
                </div>
                <div className="form-group my-lg-3">
                    <label>Photo</label>
                    <input
                        type="file" className="form-control" placeholder="Ingresa el Precio"
                        {...register("photo2", { required: false })}
                        />
                </div>
                <div className="form-group my-lg-3">
                    <label>Photo</label>
                    <input
                        type="file" className="form-control" placeholder="Ingresa el Precio"
                        {...register("photo3", { required: false })}
                        />
                </div>
                <div className="form-group my-lg-3">
                    <label>Price</label>
                    <input
                        type="number" className="form-control" placeholder="Ingresa el Precio"
                        {...register("price", { required: true })}
                        onInvalid={e => e.target.setCustomValidity("Ingresa el Precio")}
                        onInput={e => e.target.setCustomValidity('')}
                        required />
                </div>
                <div className="form-group my-lg-3">
                    <label>Stock</label>
                    <input
                        type="number" className="form-control" placeholder="Ingresa el Stock"
                        {...register("stock", { required: true })}
                        onInvalid={e => e.target.setCustomValidity("Ingresa el Stock")}
                        onInput={e => e.target.setCustomValidity('')}
                        required />
                </div>

                <div>
                    <button id='btnReg' type="submit" className="btn btn-success btn-lg btn-block my-3">Add Product</button>
                    <button onClick={back} id='btnBack' type="submit" className="btn btn-danger btn-lg btn-block my-3">Go back</button>
                </div>
            </form >
        </div >
    )
}

