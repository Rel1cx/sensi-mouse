use mac_mouse_sys::*;

#[test]
fn resolution() {
    let prev_res = get_pointer_resolution().unwrap();
    let res = 7864320;

    set_pointer_resolution(res).unwrap();

    let ret = get_pointer_resolution().unwrap();

    assert_eq!(ret, res);

    set_pointer_resolution(prev_res).unwrap();
}

#[test]
fn acceleration() {
    let prev_acc = get_mouse_acceleration().unwrap();
    let acc = 0;

    set_mouse_acceleration(acc).unwrap();

    let ret = get_mouse_acceleration().unwrap();

    assert_eq!(ret, acc);

    set_mouse_acceleration(prev_acc).unwrap();
}
