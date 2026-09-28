use super::*;
pub fn parse(text: &str) -> Result<std::collections::BTreeMap<String, String>, Error> {
    let lines: Vec<&str> = text.lines().collect();
    if lines.first() != Some(&"---") {
        return Err(Error::Invalid("missing frontmatter".into()));
    }
    let end = lines
        .iter()
        .skip(1)
        .position(|x| *x == "---")
        .ok_or_else(|| Error::Invalid("unclosed frontmatter".into()))?
        + 1;
    let mut result = std::collections::BTreeMap::new();
    for line in &lines[1..end] {
        if line.trim().is_empty() {
            continue;
        }
        let (key, value) = line
            .split_once(':')
            .ok_or_else(|| Error::Invalid("expected key: value".into()))?;
        let key = key.trim();
        let value = value.trim();
        if key.is_empty()
            || value.is_empty()
            || value.starts_with(['!', '&', '*', '|', '>', '[', '{', '\'', '"'])
        {
            return Err(Error::Invalid("unsupported YAML syntax".into()));
        }
        if result.insert(key.into(), value.into()).is_some() {
            return Err(Error::Conflict);
        }
    }
    result.insert("$body".into(), lines[end + 1..].join("\n"));
    Ok(result)
}
