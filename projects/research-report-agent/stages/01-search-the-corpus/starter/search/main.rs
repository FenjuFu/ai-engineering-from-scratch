// Stage 1: implement the Rust search engine.
// Lesson: projects/research-report-agent/stages/01-search-the-corpus/docs/en.md
// JSON requests enter stdin; JSON replies leave stdout. RFC 8259 defines strings.
// Python's search adapter must call this binary, rather than duplicate BM25.
use std::collections::BTreeMap;
#[derive(Debug, Clone, PartialEq)]
pub struct Document { pub id:String, pub title:String, pub source_url:String, pub published:String, pub text:String }
#[derive(Debug, Clone, PartialEq)]
pub enum Json { Null, Bool(bool), Number(f64), Str(String), Array(Vec<Json>), Object(Vec<(String,Json)>) }
pub struct Index { pub documents:Vec<Document> }
pub fn tokenize(_: &str) -> Vec<String> { unimplemented!("Stage 1: implement Rust tokenizer") }
pub fn parse_document(_: &str, _: &str) -> Result<Document,String> { unimplemented!("Stage 1: implement corpus parser") }
pub fn parse_json(_: &str) -> Result<Json,String> { unimplemented!("Stage 1: implement JSON parser") }
pub fn json_string(_: &str) -> String { unimplemented!("Stage 1: implement JSON escaping") }
pub fn handle_line(_: &Index, _: &str) -> String { unimplemented!("Stage 1: implement request handler") }
impl Index {
    pub fn new(_:Vec<Document>) -> Self { unimplemented!("Stage 1: implement BM25 index") }
    pub fn search(&self, _: &str, _:usize) -> Vec<(String,f64)> { unimplemented!("Stage 1: implement ranking") }
    pub fn idf_table(&self) -> BTreeMap<String,f64> { unimplemented!("Stage 1: implement IDF table") }
}
fn main() { eprintln!("Stage 1: not implemented yet; read the stage lesson"); std::process::exit(1); }
