use mac_mouse_sys::*;

const MAX_SEN: i32 = 199;
const DEFAULT_ACC: i32 = 57344;

pub fn res_to_sen(res: i32) -> i32 {
    (2000 - (res / 65536)) / 10
}

pub fn sen_to_res(sen: i32) -> i32 {
    (2000 - (sen * 10)) * 65536
}

pub fn read_mouse_cfg() -> Result<(i32, bool), String> {
    let sen = res_to_sen(get_pointer_resolution()?);
    let acc = get_mouse_acceleration()?;
    let acc_enabled = acc != 0;

    Ok((sen, acc_enabled))
}

pub fn write_mouse_cfg(sen: i32, acc_enabled: bool) -> Result<(), String> {
    if sen < 0 || sen > MAX_SEN {
        return Err(format!("Invalid sensitivity value: {}", sen));
    }
    let acc = if acc_enabled { DEFAULT_ACC } else { 0 };

    set_pointer_resolution(sen_to_res(sen))?;
    set_mouse_acceleration(acc)?;

    Ok(())
}
