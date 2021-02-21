import { useState, useEffect } from "react";

export default function useIp() {
    const [ip, setIp] = useState(null);

    function asyncGetIp(setIp) {
        if (localStorage.getItem('pb-ip')) {
            setIp(localStorage.getItem('pb-ip'));
            return;
        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const ip = JSON.parse(this.responseText).ip
                if (!localStorage.getItem('pb-ip')) {
                    localStorage.setItem('pb-ip', ip)
                }
                setIp(ip)
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