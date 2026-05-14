# event-japan

日本で開催予定のイベントに関するオープンデータです。デジタル庁のベース・レジストリから自動的に集約しています。

本リポジトリは、複数の政府データセットからイベントデータを取得し、現在および今後のイベントのみを抽出して、CSVおよびJSON-LD形式で統合データを提供します。

## ライブデモ

最新のイベントデータを可視化したサンプルアプリケーションです:

- **[開催予定イベント情報アプリ](https://code4fukui.github.io/event-japan/app/)**

## データファイル

データはGitHub Actionsにより、毎日17:54（JST）に自動更新されます。

- **最新の開催予定イベント (CSV)**
  - [`data-latest/event-latest.csv`](https://github.com/code4fukui/event-japan/blob/main/data-latest/event-latest.csv)
  - 有効な（現在または今後の）イベントのみを抽出したリストです。このファイルは128のデータセットから集約されており、スナップショットの例として全3,699件のレコードのうち28件の有効なイベントが含まれています。

- **最新の開催予定イベント (JSON-LD)**
  - [`data-latest/event-latest.jsonld`](https://github.com/code4fukui/event-japan/blob/main/data-latest/event-latest.jsonld)
  - CSVから生成された、最新イベントのJSON-LD版です。

- **LinkedCSVメタデータ**
  - [`data-latest/event-latest.csv.jsonld`](https://github.com/code4fukui/event-japan/blob/main/data-latest/event-latest.csv.jsonld)
  - LinkedCSV互換性のためのメタデータファイルです。

- **生データ**
  - [`data/`](https://github.com/code4fukui/event-japan/tree/main/data)
  - ダウンロードしたすべてのイベントデータセットの、フィルタリングされていない完全なコレクションです。

- **データ語彙**
  - [`names.csv`](https://github.com/code4fukui/event-japan/blob/main/names.csv): すべてのCSV列ヘッダーのリストです。
  - [`event-schema.jsonld`](https://github.com/code4fukui/event-japan/blob/main/data-latest/event-schema.jsonld): JSON-LDデータのコンテキストです。

## 仕組み

GitHub Actionsのワークフロー（`schduled-fetch.yml`）が毎日実行され、以下の処理を行います:
1. `download.js`を使用し、日本のベース・レジストリ データカタログサイトからすべてのイベントの生データセットを取得します。
2. `makeLatest.js`を使用し、過去のイベントを除外して、今後の開催予定イベントを`event-latest.csv`に統合します。
3. 更新されたデータをリポジトリにコミットおよびプッシュします。

## 使い方（ローカル開発）

データ処理スクリプトをローカルで実行するには、[Deno](https://deno.land/)が必要です。

1.  **リポジトリをクローンします:**
    ```sh
    git clone https://github.com/code4fukui/event-japan.git
    cd event-japan
    ```

2.  **Denoスクリプトを実行します:**
    ```sh
    # ソースから生データを取得
    deno run -A download.js

    # 開催予定イベントを抽出し、最新のCSVを作成
    deno run -A makeLatest.js

    # 最新のCSVからJSON-LD版を生成
    deno run -A makeJSONLD.js
    ```

## データソース

本プロジェクトは、デジタル庁が提供するオープンデータを利用しています。

- **[グループ - ベース・レジストリ データカタログサイト](https://registry-catalog.registries.digital.go.jp/dataset/?groups=g1-000304)**

## ライセンス
MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
