import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from "lottie-react";
import mushroomGrowth from "../PlantAnimation.json";
import { FaUser, FaLock, FaSeedling, FaFlask, FaChartLine, FaBoxOpen, FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { value: 'LAB_STAFF', label: 'Lab Staff', icon: FaFlask, color: 'text-success' },
    { value: 'REPORT_MANAGER', label: 'Report Manager', icon: FaChartLine, color: 'text-primary' },
    { value: 'INVENTORY_MANAGER', label: 'Inventory Manager', icon: FaBoxOpen, color: 'text-warning' },
    { value: 'SALES_MANAGER', label: 'Sales Manager', icon: FaSeedling, color: 'text-info' }
  ];

  const login = async () => {
    setError('');
    setIsLoading(true);

    if (!username || !password || !role) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
        credentials: 'include',
      });

      if (res.ok) {
        localStorage.setItem('userRole', role);
        switch(role) {
          case 'LAB_STAFF':
            navigate('/lab');
            break;
          case 'REPORT_MANAGER':
            navigate('/admin');
            break;
          case 'INVENTORY_MANAGER':
            navigate('/inventory');
            break;
          case 'SALES_MANAGER':
            navigate('/sales');
            break;
          default:
            navigate('/Login');
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Connection failed. Please check your network.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className="min-vh-100 d-flex" style={{ background: 'linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #74b9ff 100%)' }}>
      {/* Left Side - Branding */}
      <div className="col-lg-7 d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5" style={{ position: 'relative' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
          background: 'radial-gradient(circle at 30% 70%, rgba(45, 80, 22, 0.3) 0%, transparent 50%)',
          zIndex: 1
        }}></div>
        <div className="text-center mb-5 position-relative" style={{ zIndex: 2 }}>
          <div className="mb-4 p-4 rounded-circle d-inline-block" style={{ 
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Lottie 
              animationData={mushroomGrowth} 
              style={{ height: 200, filter: 'brightness(0) invert(1)' }} 
            />
          </div>
          <h1 className="display-3 fw-bold mb-3" style={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            background: 'linear-gradient(45deg, #fff, #e8f5e8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>FungiFlow</h1>
          <p className="fs-4 opacity-90 mb-5" style={{ fontWeight: '300', letterSpacing: '1px' }}>
            Smart Mushroom Farm Management
          </p>
          <div className="d-flex justify-content-center gap-5">
            <div className="text-center">
              <div className="bg-white bg-opacity-15 rounded-circle p-4 mb-3 d-inline-block shadow-lg" style={{
                border: '2px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}>
                <FaSeedling size="2em" style={{ color: '#90EE90' }} />
              </div>
              <div className="fw-semibold">5 Varieties</div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-15 rounded-circle p-4 mb-3 d-inline-block shadow-lg" style={{
                border: '2px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}>
                <FaFlask size="2em" style={{ color: '#98FB98' }} />
              </div>
              <div className="fw-semibold">4 Labs</div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-15 rounded-circle p-4 mb-3 d-inline-block shadow-lg" style={{
                border: '2px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}>
                <FaChartLine size="2em" style={{ color: '#ADFF2F' }} />
              </div>
              <div className="fw-semibold">85% Market</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="col-lg-5 d-flex flex-column justify-content-center bg-white position-relative" style={{
        boxShadow: '-10px 0 30px rgba(0,0,0,0.1)'
      }}>
        <div className="position-absolute top-0 end-0 w-100 h-100" style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(46, 125, 50, 0.03) 100%)',
          zIndex: 1
        }}></div>
        
        <div className="p-5 position-relative" style={{ zIndex: 2 }}>
          <div className="text-center mb-5">
            <div className="d-inline-block p-3 rounded-circle mb-3" style={{
              background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
              boxShadow: '0 8px 32px rgba(46, 125, 50, 0.3)'
            }}>
              <FaSeedling size="1.5em" color="white" />
            </div>
            <h2 className="fw-bold mb-2" style={{ 
              color: '#1b5e20',
              fontSize: '2.2rem'
            }}>Welcome Back</h2>
            <p className="text-muted fs-6">Sign in to your account to continue your journey</p>
          </div>

          {error && (
            <div className="alert alert-danger rounded-4 border-0 mb-4" role="alert" style={{
              background: 'linear-gradient(135deg, #ffebee, #ffcdd2)',
              color: '#c62828',
              boxShadow: '0 4px 12px rgba(198, 40, 40, 0.15)'
            }}>
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          {/* Role Selection */}
          <div className="mb-4">
            <label className="form-label fw-bold mb-3" style={{ color: '#1b5e20', fontSize: '1.1rem' }}>
              Select Your Role
            </label>
            <div className="row g-3">
              {roles.map((roleOption) => {
                const IconComponent = roleOption.icon;
                return (
                  <div key={roleOption.value} className="col-6">
                    <input
                      type="radio"
                      className="btn-check"
                      id={roleOption.value}
                      name="role"
                      value={roleOption.value}
                      checked={role === roleOption.value}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label
                      className={`btn w-100 p-3 text-start rounded-3 position-relative overflow-hidden ${
                        role === roleOption.value 
                          ? 'text-white' 
                          : 'btn-outline-success text-success'
                      }`}
                      htmlFor={roleOption.value}
                      style={{
                        background: role === roleOption.value 
                          ? 'linear-gradient(135deg, #2e7d32, #4caf50)'
                          : 'transparent',
                        border: role === roleOption.value 
                          ? 'none' 
                          : '2px solid #e8f5e9',
                        transition: 'all 0.3s ease',
                        boxShadow: role === roleOption.value 
                          ? '0 8px 24px rgba(46, 125, 50, 0.3)' 
                          : '0 2px 8px rgba(0,0,0,0.05)',
                        transform: role === roleOption.value ? 'translateY(-2px)' : 'none'
                      }}
                    >
                      <IconComponent className={`me-2 ${role === roleOption.value ? 'text-white' : roleOption.color}`} size="1.2em" />
                      <div className="fw-semibold small">{roleOption.label}</div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Username Input */}
          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ color: '#1b5e20' }}>Username</label>
            <div className="input-group" style={{ height: '3.2rem' }}>
              <span className="input-group-text border-end-0 rounded-start-3" style={{
                background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)',
                border: '2px solid #e8f5e9'
              }}>
                <FaUser style={{ color: '#2e7d32' }} />
              </span>
              <input
                type="text"
                className="form-control border-start-0 rounded-end-3"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  border: '2px solid #e8f5e9',
                  fontSize: '1.05rem',
                  transition: 'all 0.3s ease',
                  boxShadow: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #4caf50';
                  e.target.style.boxShadow = '0 0 0 0.2rem rgba(76, 175, 80, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid #e8f5e9';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ color: '#1b5e20' }}>Password</label>
            <div className="input-group" style={{ height: '3.2rem' }}>
              <span className="input-group-text border-end-0 rounded-start-3" style={{
                background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)',
                border: '2px solid #e8f5e9'
              }}>
                <FaLock style={{ color: '#2e7d32' }} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control border-start-0 border-end-0"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  border: '2px solid #e8f5e9',
                  fontSize: '1.05rem',
                  transition: 'all 0.3s ease',
                  boxShadow: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #4caf50';
                  e.target.style.boxShadow = '0 0 0 0.2rem rgba(76, 175, 80, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid #e8f5e9';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                className="btn rounded-end-3"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)',
                  border: '2px solid #e8f5e9',
                  color: '#2e7d32'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            className="btn w-100 py-3 mb-4 fw-bold rounded-3 position-relative overflow-hidden"
            onClick={login}
            disabled={isLoading}
            style={{ 
              background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 50%, #66bb6a 100%)',
              border: 'none',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(46, 125, 50, 0.3)',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 32px rgba(46, 125, 50, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 24px rgba(46, 125, 50, 0.3)';
            }}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing in...
              </>
            ) : (
              'Sign In to Continue'
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center mb-4">
            <span className="text-muted">Don't have an account? </span>
            <Link 
              to="/Signup" 
              className="text-decoration-none fw-bold"
              style={{ 
                color: '#2e7d32',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#1b5e20'}
              onMouseLeave={(e) => e.target.style.color = '#2e7d32'}
            >
              Create Account
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center mt-5 pt-4" style={{ borderTop: '2px solid #e8f5e9' }}>
            <small className="text-muted d-block mb-2">
              Powered by <strong style={{ color: '#2e7d32' }}>Mushroom Development and Training Centre</strong>
            </small>
            <div className="d-flex justify-content-center gap-2">
              <div className="bg-success bg-opacity-10 rounded-circle p-1">
                <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></div>
              </div>
              <small className="text-success fw-semibold">System Online</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;