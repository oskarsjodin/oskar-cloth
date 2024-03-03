import './button.styles.scss';
const Button = ({ label, ...otherProps}) => {
  return  <div >
             <button className="button-container" type="submit" {...otherProps}>{label}</button>
          </div>
}
export default Button;
