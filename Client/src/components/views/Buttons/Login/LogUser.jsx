import './LogUser.css'
export const LogUser = ({ PopUp, User }) => {
  return (
    <button onClick={PopUp} className='logAccount'>
      <div className='cajonLogin'>
        {User?.email ? (
          <span className="logintext">{User.email}</span>
        ) : (
          <span className="logintext">My Account</span>
        )}
        <span className="iconUser">
          <div className='LoginUser'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </div>
        </span>
      </div>
    </button>
  );
};
