'use client';

import {useEffect, useState} from "react";
import {appVersion, nextVersion, reactVersion} from "@/lib/version";
import { createNonce } from "@/app/actions/create-nonce";

interface ApiResponse {
    state: string;
    timestamp: string;
}

export default function Up() {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        async function fetchInternalStatus() {
            try {
                const nonce = await createNonce();
                console.log(nonce, "nonce");
                const res = await fetch("/api/up", {
                    cache: "no-store",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-nonce': nonce,
                    },
                });

                if (!res.ok) {
                    setError(`${res.status}`);
                }
                const json = await res.json();
                setData(json);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        fetchInternalStatus();
    }, []);

    if (loading) return <p className = "text-gray-700" > Lade Status …</p>;

    return (
        <div className="p-4 rounded-lg bg-slate-100 text-slate-900 shadow">
            <h3 className="text-lg font-semibold text-center">Server Status</h3>
            <p className={"mt-3"}>App Version: v{appVersion}</p>
            <p>Next Version: v{nextVersion}</p>
            <p>React Version: v{reactVersion}</p>
            <p className={"mt-3"}>Internal Status: {error ? error : data?.state}</p>
            <p>Timestamp: {data?.timestamp}</p>
            {/*<p className={"mt-3"}>Brevo Status: {brevoError ? brevoError : brevoData?.state}</p>*/}
            {/*<p>Zeitstempel: {brevoData?.timestamp}</p>*/}
        </div>
    );
}