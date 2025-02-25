import { useForm } from 'react-hook-form';
import { Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import styles from './modifyProduct.module.css';

export function ModifyProductPanel({ modify, product, back }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [photos, setPhotos] = useState(product?.photos || []);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddPhoto = (e) => {
    const file = e.target.files[0];
    if (file && photos.length < 4) {
      const updatedPhotos = [...photos, file];
      setPhotos(updatedPhotos);
      setValue('photos', updatedPhotos);
    }
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    setValue('photos', updatedPhotos);
  };

  const isFoldedDevice = windowWidth <= 280;

  return (
    <div className={styles.addProductContainer}>
      <div>
        <h3 className={styles.title}>Welcome Admin</h3>
        <h5 className="text-center text-white">You can modify the product using this form</h5>
      </div>
      <Card className={styles.addProductCard}>
        <Card.Body>
          <Form onSubmit={handleSubmit(modify)} className={styles.addProductForm}>
            <Form.Group className={styles.formGroup}>
              <div className={styles.inputBox}>
                <Form.Control
                  type="text"
                  placeholder=" "
                  id="name"
                  isInvalid={!!errors.name}
                  defaultValue={product?.name || ''}
                  {...register('name', { required: 'Product name is required' })}
                />
                <Form.Label htmlFor="name">Enter name</Form.Label>
                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className={styles.formGroup}>
              <div className={styles.inputBox}>
                <Form.Control
                  type="text"
                  placeholder=" "
                  id="description"
                  isInvalid={!!errors.description}
                  defaultValue={product?.description || ''}
                  {...register('description', {
                    required: 'Description is required',
                    maxLength: { value: 30, message: 'Description must be less than 30 characters' },
                  })}
                />
                <Form.Label htmlFor="description">Enter description</Form.Label>
                <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className={styles.formGroup}>
              <div className={styles.inputBox}>
                <Form.Control
                  type="text"
                  placeholder=" "
                  id="code"
                  isInvalid={!!errors.code}
                  defaultValue={product?.code || ''}
                  {...register('code', { required: 'Code is required' })}
                />
                <Form.Label htmlFor="code">Enter code</Form.Label>
                <Form.Control.Feedback type="invalid">{errors.code?.message}</Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className={styles.formGroup}>
              <div className={styles.inputBox}>
                <Form.Control
                  type="text"
                  placeholder=" "
                  id="category"
                  isInvalid={!!errors.category}
                  defaultValue={product?.category || ''}
                  {...register('category', { required: 'Category is required' })}
                />
                <Form.Label htmlFor="category">Enter category</Form.Label>
                <Form.Control.Feedback type="invalid">{errors.category?.message}</Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className={styles.formGroup}>
              <div className={styles.inputBox}>
                <Form.Control
                  type="number"
                  placeholder=" "
                  id="price"
                  isInvalid={!!errors.price}
                  defaultValue={product?.price || ''}
                  {...register('price', { required: 'Product price is required' })}
                />
                <Form.Label htmlFor="price">Enter price</Form.Label>
                <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className={styles.formGroup}>
              <div className={styles.inputBox}>
                <Form.Control
                  type="number"
                  placeholder=" "
                  id="stock"
                  isInvalid={!!errors.stock}
                  defaultValue={product?.stock || ''}
                  {...register('stock', { required: 'Stock is required' })}
                />
                <Form.Label htmlFor="stock">Enter stock</Form.Label>
                <Form.Control.Feedback type="invalid">{errors.stock?.message}</Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className={styles.formGroup}>
              <label htmlFor="photo-upload" className="mb-2" style={{ fontWeight: 'bold', display: 'block' }}>
                Product Photos ({photos.length}/4)
              </label>

              <div className={styles.photoContainer}>
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className={styles.photoPreview}
                    style={{
                      width: isFoldedDevice ? '60px' : '90px',
                      height: isFoldedDevice ? '60px' : '90px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '2px solid var(--page-background)',
                      position: 'relative',
                      marginBottom: '10px',
                    }}
                  >
                    <img
                      src={photo instanceof File ? URL.createObjectURL(photo) : photo}
                      alt={`photo-${index}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className={styles.removePhotoBtn}
                      style={{
                        top: '3px',
                        right: '3px',
                        width: isFoldedDevice ? '18px' : '24px',
                        height: isFoldedDevice ? '18px' : '24px',
                        padding: '0',
                        fontSize: isFoldedDevice ? '12px' : '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              <div className="d-flex align-items-center">
                <input
                  type="file"
                  accept="image/*"
                  id="photo-upload"
                  className="d-none"
                  onChange={handleAddPhoto}
                />

                <label
                  htmlFor="photo-upload"
                  className={`btn ${photos.length >= 4 ? 'btn-secondary' : 'btn-primary'}`}
                  style={{
                    backgroundColor: photos.length >= 4 ? '#6c757d' : 'var(--button-color)',
                    borderRadius: '24px',
                    padding: isFoldedDevice ? '0.3rem 0.8rem' : '0.5rem 1rem',
                    fontSize: isFoldedDevice ? '0.8rem' : '1rem',
                    cursor: photos.length >= 4 ? 'not-allowed' : 'pointer',
                  }}
                >
                  {photos.length >= 4 ? 'Max Photos' : 'Add Photo'}
                </label>
              </div>
            </Form.Group>

            <div className="d-flex flex-column flex-md-row justify-content-between">
              <button
                type="submit"
                className="btn btn-success btn-lg my-2"
                style={{
                  borderRadius: '24px',
                  padding: isFoldedDevice ? '0.5rem 1rem' : '0.5rem 2rem',
                  fontSize: isFoldedDevice ? '0.9rem' : '1rem',
                  backgroundColor: 'var(--button-color)',
                }}
              >
                Modify Product
              </button>
              <button
                onClick={back}
                type="button"
                className="btn btn-danger btn-lg my-2"
                style={{
                  borderRadius: '24px',
                  padding: isFoldedDevice ? '0.5rem 1rem' : '0.5rem 2rem',
                  fontSize: isFoldedDevice ? '0.9rem' : '1rem',
                  backgroundColor: 'var(--primary-color)',
                }}
              >
                Go Back
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
