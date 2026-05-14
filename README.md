# event-japan

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

Open data for upcoming events in Japan, automatically aggregated from the Digital Agency's Base Registry.

This repository fetches event data from multiple government datasets, filters for current and future events, and provides the consolidated data in CSV and JSON-LD formats.

## Live Demo

A sample application visualizing the latest event data:

- **[Upcoming Event Information App](https://code4fukui.github.io/event-japan/app/)**

## Data Files

The data is automatically updated daily around 17:54 JST via GitHub Actions.

- **Latest Upcoming Events (CSV)**
  - [`data-latest/event-latest.csv`](https://github.com/code4fukui/event-japan/blob/main/data-latest/event-latest.csv)
  - A filtered list containing only valid (current or future) events. This file aggregates data from 128 datasets, containing 28 valid events out of 3,699 total records as an example snapshot.

- **Latest Upcoming Events (JSON-LD)**
  - [`data-latest/event-latest.jsonld`](https://github.com/code4fukui/event-japan/blob/main/data-latest/event-latest.jsonld)
  - The JSON-LD version of the latest events, generated from the CSV.

- **LinkedCSV Metadata**
  - [`data-latest/event-latest.csv.jsonld`](https://github.com/code4fukui/event-japan/blob/main/data-latest/event-latest.csv.jsonld)
  - Metadata file for LinkedCSV compatibility.

- **Raw Data**
  - [`data/`](https://github.com/code4fukui/event-japan/tree/main/data)
  - The complete, unfiltered collection of all downloaded event datasets.

- **Data Vocabulary**
  - [`names.csv`](https://github.com/code4fukui/event-japan/blob/main/names.csv): A list of all CSV column headers.
  - [`event-schema.jsonld`](https://github.com/code4fukui/event-japan/blob/main/data-latest/event-schema.jsonld): The context for the JSON-LD data.

## How It Works

A GitHub Actions workflow (`schduled-fetch.yml`) runs daily to:
1.  Fetch all raw event datasets from Japan's Base Registry Data Catalog using `download.js`.
2.  Filter out past events and consolidate the upcoming ones into `event-latest.csv` using `makeLatest.js`.
3.  Commit and push the updated data to the repository.

## Usage (Local Development)

To run the data processing scripts locally, you need [Deno](https://deno.land/).

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/code4fukui/event-japan.git
    cd event-japan
    ```

2.  **Run the Deno scripts:**
    ```sh
    # Fetch raw data from the source
    deno run -A download.js

    # Filter for upcoming events and create the latest CSV
    deno run -A makeLatest.js

    # Generate the JSON-LD version from the latest CSV
    deno run -A makeJSONLD.js
    ```

## Data Source

This project utilizes open data from the Digital Agency of Japan.

- **[Group - Base Registry Data Catalog Site](https://registry-catalog.registries.digital.go.jp/dataset/?groups=g1-000304)**

## License
MIT License — see [LICENSE](LICENSE).