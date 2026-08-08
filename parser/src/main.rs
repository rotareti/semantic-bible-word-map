use regex::Regex;
use serde_json::Value;
use std::env;
use std::fs;
use std::io::{self, Write};
use std::path::Path;

fn main() -> io::Result<()> {
    let args: Vec<String> = env::args().collect();
    if args.len() < 3 {
        eprintln!("Usage: {} <raw_dir> <processed_dir>", args[0]);
        std::process::exit(1);
    }

    let raw_dir = Path::new(&args[1]);
    let processed_dir = Path::new(&args[2]);

    if !processed_dir.exists() {
        fs::create_dir_all(processed_dir)?;
    }

    let out_path = processed_dir.join("text.txt");
    let mut out_file = fs::File::create(out_path)?;

    // Regex to keep only alphabetic characters and spaces
    let re = Regex::new(r"[^a-zA-Z\s]").unwrap();

    let mut paths: Vec<_> = fs::read_dir(raw_dir)?
        .filter_map(|entry| entry.ok())
        .map(|entry| entry.path())
        .filter(|path| path.extension().map_or(false, |e| e == "usj"))
        .collect();
    paths.sort(); // Consistent order

    for path in paths {
        let content = fs::read_to_string(&path)?;
        let json: Value = serde_json::from_str(&content).expect("Invalid JSON");
        
        let mut extracted_text = String::new();
        extract_strings(&json, &mut extracted_text);

        let cleaned = re.replace_all(&extracted_text, " ");
        let cleaned = cleaned.to_lowercase();
        let words: Vec<&str> = cleaned.split_whitespace().collect();
        let final_text = words.join(" ");

        if !final_text.is_empty() {
            writeln!(out_file, "{}", final_text)?;
        }
    }

    Ok(())
}

fn extract_strings(val: &Value, out: &mut String) {
    match val {
        Value::String(s) => {
            out.push_str(s);
            out.push(' ');
        }
        Value::Array(arr) => {
            for item in arr {
                extract_strings(item, out);
            }
        }
        Value::Object(map) => {
            if let Some(content) = map.get("content") {
                extract_strings(content, out);
            }
        }
        _ => {}
    }
}
