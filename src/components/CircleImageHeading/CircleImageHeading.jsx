import './CSS/CircleImageHeading.css';

const CircleImageHeading = ({ imageUrl, description }) => {
  return (
    <div className="circle-image-heading-container">
      <div className="circle-image">
        <img src={imageUrl} alt="" />
      </div>

      <div className="text-content">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CircleImageHeading;
