#![warn(trivial_casts, trivial_numeric_casts)]
#![cfg(target_os = "macos")]
#![allow(improper_ctypes)]

mod sys {
    use libc::c_int;
    #[link(name = "mouse")]
    extern "C" {
        pub fn getPointerResolution() -> c_int;
        pub fn getMouseAcceleration() -> c_int;
        pub fn setPointerResolution(res: c_int) -> c_int;
        pub fn setMouseAcceleration(acc: c_int) -> c_int;
    }
}

pub fn get_pointer_resolution() -> Result<i32, String> {
    let res = unsafe { sys::getPointerResolution() };
    if res == -1 {
        Err("Failed to get pointer resolution".to_string())
    } else {
        Ok(res)
    }
}

pub fn get_mouse_acceleration() -> Result<i32, String> {
    let acc = unsafe { sys::getMouseAcceleration() };
    if acc == -1 {
        Err("Failed to get mouse acceleration".to_string())
    } else {
        Ok(acc)
    }
}

pub fn set_pointer_resolution(res: i32) -> Result<(), String> {
    let ret = unsafe { sys::setPointerResolution(res) };
    if ret != 0 {
        Err("Failed to set pointer resolution".to_string())
    } else {
        Ok(())
    }
}

pub fn set_mouse_acceleration(acc: i32) -> Result<(), String> {
    let ret = unsafe { sys::setMouseAcceleration(acc) };
    if ret != 0 {
        Err("Failed to set mouse acceleration".to_string())
    } else {
        Ok(())
    }
}
