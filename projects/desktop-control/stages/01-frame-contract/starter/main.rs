#[derive(Debug, Clone, PartialEq)]
pub struct Frame {
    pub width: u32,
    pub height: u32,
    pub scale: f64,
    pub generation: u64,
    pub format: String,
    pub bytes: Vec<u8>,
}
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Point {
    pub x: u32,
    pub y: u32,
}
impl Frame {
    pub fn validate(&self) -> Result<(), String> {
        Err("Not implemented: validate frame".into())
    }
    pub fn logical_point(&self, _x: f64, _y: f64) -> Result<Point, String> {
        Err("Not implemented: coordinate conversion".into())
    }
}
fn main() {
    panic!("Not implemented: desktop backend");
}
