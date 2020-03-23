import React from 'react';
import { useForm } from 'react-hook-form'
import './ShipmentDetail.css';
import { useAuth } from '../Login/userAuth';

const ShipmentDetail = () => {
    const auth = useAuth();
    const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => { console.log(data) }

  return (
    <div className="col-md-8 shipment">
        <h2>Edit Delivery Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} />
        {errors.name && <span>This field is required</span>}
        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} />
        {errors.email && <span>This field is required</span>}
        <input name="address1" ref={register({ required: true })} placeholder="Address 1" />
        {errors.address1 && <span>This field is required</span>}
        <input name="address2" ref={register({ required: true })} placeholder="Address 2"/>
        {errors.address2 && <span>This field is required</span>}
        <input name="country" ref={register({ required: true })} placeholder="Country"/>
        {errors.country && <span>This field is required</span>}
        <input name="city" ref={register({ required: true })} placeholder="City"/>
        {errors.city && <span>This field is required</span>}
        <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code"/>
        {errors.zipcode && <span>This field is required</span>}
        <button type="submit" className="submit-button">Save & Continue</button>
        </form>
    </div>
  )
};

export default ShipmentDetail;