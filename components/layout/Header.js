/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../../redux/actions/userActions'
import { signOut } from 'next-auth/client'

const Header = () => {

    const [dropdown, setDropdown] = useState(false)

    const dispatch = useDispatch()

    const { user, loading } = useSelector(state => state.loadedUser)

    useEffect(() => {
        if (!user) {
            dispatch(loadUser())
        }
    }, [dispatch, user])


    const logoutHandler = () => {
        signOut();
    }

    return (
        <nav className="navbar row justify-content-center sticky-top">
            <div className="container">
                <div className="col-3 p-0">
                    <div className="navbar-brand">
                        <Link href='/'>
                            <a>
                                <img style={{ cursor: 'pointer' }} src="/images/bookit_logo.png" alt="BookIT" />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="col-3 mt-3 mt-md-0 text-center">
                    {user ?
                        <div className="ml-4 dropdown d-line">
                            <a
                                className="btn dropdown-toggle mr-4"
                                onClick={() => setDropdown(!dropdown)}
                            >
                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </a>
                            {dropdown &&
                                <div
                                    className="dropdown-menu"
                                    style={dropdown ? { display: 'block' } : { display: 'none' }}
                                >
                                    {user.role === 'admin' &&
                                        <>
                                            <Link href='/admin/rooms' onClick={() => setDropdown(false)}>
                                                <a className="dropdown-item">Rooms</a>
                                            </Link>

                                            <Link href='/admin/bookings' onClick={() => setDropdown(false)}>
                                                <a className="dropdown-item">Bookings</a>
                                            </Link>

                                            <Link href='/admin/users' onClick={() => setDropdown(false)}>
                                                <a className="dropdown-item">Users</a>
                                            </Link>

                                            <Link href='/admin/reviews' onClick={() => setDropdown(false)}>
                                                <a className="dropdown-item">Reviews</a>
                                            </Link>
                                            <hr />
                                        </>
                                    }
                                    <Link href='/bookings/me' onClick={() => setDropdown(false)}>
                                        <a className="dropdown-item">My Bookings</a>
                                    </Link>
                                    <Link href='/me/update' onClick={() => setDropdown(false)}>
                                        <a className="dropdown-item">Profile</a>
                                    </Link>
                                    <Link href='/' onClick={() => setDropdown(false)}>
                                        <a className="dropdown-item text-danger" onClick={logoutHandler}>Logout</a>
                                    </Link>
                                </div>
                            }
                        </div>
                        :
                        !loading && <Link href='/login' onClick={() => setDropdown(false)}>
                            <a className="btn btn-danger px-4 text-white login-header-btn float-right">Login</a>
                        </Link>
                    }
                </div>
            </div>
        </nav >
    )
}

export default Header
