import { useForm } from 'react-hook-form'

export function ModifyProductPanel({ modify, product, back }) {
    const { register, handleSubmit } = useForm()
    return (
        <div className="Sign">
            <div>
                <h3>Wellcome Admin</h3>
                <h5>You can modify a product from this form</h5>
            </div>
            <form onSubmit={handleSubmit(modify)} className="my-5">
                <div className="form-group my-lg-3">
                    <label>Id</label>
                    <input
                        defaultValue={product.Id}
                        type="text" className="form-control" placeholder="Ingresa tu nombre"
                        {...register("Id", { required: true })}
                        readOnly
                    />
                </div>
                <div className="form-group my-lg-3">
                    <label>Name</label>
                    <input
                        defaultValue={product.name}
                        type="text" className="form-control" placeholder="Ingresa el nombre del producto"
                        {...register("name", { required: true })}
                        onInvalid={e => e.target.setCustomValidity("El campo Nombre no puede estar vacio")}
                        onInput={e => e.target.setCustomValidity('')}
                        required />
                </div>
                <div className="form-group my-lg-3">
                    <label>Description</label>
                    <input
                    defaultValue={product.description}
                        type="text" className="form-control" placeholder="Ingresa la descripcion del producto"
                        {...register("description", { required: true })}
                        onInvalid={e => e.target.setCustomValidity("Ingresa la descripcion")}
                        onInput={e => e.target.setCustomValidity('')}
                        required />
                </div>
                <div className="form-group my-lg-3">
                    <label>Code</label>
                    <input
                    defaultValue={product.code}
                        type="text" className="form-control" placeholder="Ingresa el codigo del producto"
                        {...register("code", { required: true })}
                        onInvalid={e => e.target.setCustomValidity("Ingresa el codigo")}
                        onInput={e => e.target.setCustomValidity('')}
                        required />
                </div>
                <div className="form-group my-lg-3">
                    <label>Category</label>
                    <input
                    defaultValue={product.category}
                        type="text" className="form-control" placeholder="Ingresa la categoria del producto"
                        {...register("category", { required: true })}
                        onInvalid={e => e.target.setCustomValidity("Ingresa la categoria")}
                        onInput={e => e.target.setCustomValidity('')}
                        required />
                </div>
                <div className="form-group my-lg-3">
                    <label>Photo</label>
                    <input                           
                        type="text" className="form-control"  defaultValue={product.photo} readOnly />
                    <input                           
                        type="file" className="form-control" placeholder="Ingresa el Precio"
                        {...register("photo", { required: false })}
                        onInvalid={e => e.target.setCustomValidity("Ingresa el Precio")}
                        onInput={e => e.target.setCustomValidity('')}
                        />
                </div>
                <div className="form-group my-lg-3">
                    <label>Photo</label>
                    <input                           
                        type="text" className="form-control"  defaultValue={product.photo2} readOnly />
                    <input                    
                        type="file" className="form-control" placeholder="Ingresa el Precio"
                        {...register("photo2", { required: false })}
                        onInvalid={e => e.target.setCustomValidity("Ingresa el Precio")}
                        onInput={e => e.target.setCustomValidity('')}
                        />
                </div>
                <div className="form-group my-lg-3">
                    <label>Photo</label>
                    <input                           
                        type="text" className="form-control"  defaultValue={product.photo3} readOnly />
                    <input               
                        type="file" className="form-control" placeholder="Ingresa el Precio"
                        {...register("photo3", { required: false })}
                        onInvalid={e => e.target.setCustomValidity("Ingresa el Precio")}
                        onInput={e => e.target.setCustomValidity('')}
                        />
                </div>
                <div className="form-group my-lg-3">
                    <label>Price</label>
                    <input
                    defaultValue={product.price}
                        type="number" className="form-control" placeholder="Ingresa el Precio"
                        {...register("price", { required: true })}
                        onInvalid={e => e.target.setCustomValidity("Ingresa el Precio")}
                        onInput={e => e.target.setCustomValidity('')}
                        required />
                </div>
                <div className="form-group my-lg-3">
                    <label>Stock</label>
                    <input
                    defaultValue={product.stock}
                        type="number" className="form-control" placeholder="Ingresa el Stock"
                        {...register("stock", { required: true })}
                        onInvalid={e => e.target.setCustomValidity("Ingresa el Stock")}
                        onInput={e => e.target.setCustomValidity('')}
                        required />
                </div>

                <div>
                    <button id='btnReg' type="submit" className="btn btn-success btn-lg btn-block my-3">Modify Product</button>
                    <button onClick={back} id='btnBack' type="submit" className="btn btn-danger btn-lg btn-block my-3">Go Back</button>
                </div>
            </form >
        </div >
    )
}

