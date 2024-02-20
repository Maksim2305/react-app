
import './Button.css';
function Button({children, className, ...props}) {

  return (
    <button type='submit' {...props} className={className}>{children}</button>
  );
}

export default Button; 