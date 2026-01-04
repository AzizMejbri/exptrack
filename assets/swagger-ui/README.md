In order to render the static swagger-ui into the browser you must have an http
server running, so:
1. If you don't have the resources yet, clone them

```bash
git clone --depth=1 https://github.com/AzizMejbri/exptrack/
mkdir tmp/
cp exptrack/assets/swagger-ui tmp/
rm -rf exptrack 
cd tmp 
```

> you can just copy the section above and run it on the terminal

2. Run the http server 
```bash
./serve.sh
```
or simply 
```bash
python3 -m http.server 8000
```

3. Visit the documentation [here](http://localhost:8000/)

4. Once you're done with the documentation, shutdown your HTTP server with
   CTRL+C


