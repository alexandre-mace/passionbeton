import { useState, useEffect } from "react";

export default function useIp() {
    const [ip, setIp] = useState(null);

    function asyncGetIp(setIp) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                setIp(JSON.parse(this.responseText).ip)
            }
        };
        xhttp.open("GET", "//api.ipify.org?format=json", true);
        xhttp.send();
    }

    useEffect(() => {
        asyncGetIp(setIp)
    }, []);

    return ip;
}