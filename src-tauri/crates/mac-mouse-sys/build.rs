extern crate cc;

fn main() {
    if cfg!(target_os = "macos") {
        cc::Build::new()
            .file("c/mouse.c")
            .flag("-fmodules")
            .flag("-Wno-deprecated-declarations")
            .flag("-framework")
            .flag("CoreFoundation")
            .flag("-framework")
            .flag("IOKit")
            .compile("mouse");
    }
}
