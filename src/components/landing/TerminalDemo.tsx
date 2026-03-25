export function TerminalDemo() {
  return (
    <div className="max-w-[860px] mx-auto mb-[100px] px-4">
      <div
        className="terminal-shine rounded-xl overflow-hidden"
        style={{
          background: "oklch(0.1 0.01 260)",
          border: "1px solid oklch(1 0 0 / 8%)",
          boxShadow:
            "0 0 0 1px oklch(1 0 0 / 4%), 0 16px 50px oklch(0 0 0 / 50%), 0 0 150px -20px oklch(0.67 0.16 260 / 0.1)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center px-4 py-3"
          style={{
            background: "oklch(0.12 0.01 260)",
            borderBottom: "1px solid oklch(1 0 0 / 8%)",
          }}
        >
          {/* Traffic light dots */}
          <div className="flex items-center gap-2">
            <span
              className="inline-block size-3 rounded-full"
              style={{ background: "#ff6259" }}
            />
            <span
              className="inline-block size-3 rounded-full"
              style={{ background: "#ffc130" }}
            />
            <span
              className="inline-block size-3 rounded-full"
              style={{ background: "#2ace44" }}
            />
          </div>
          {/* Center title */}
          <span
            className="flex-1 text-center text-xs"
            style={{ color: "oklch(0.55 0.01 260)" }}
          >
            opsctl — AI Agent Session
          </span>
          {/* Spacer to balance traffic lights */}
          <div className="w-[52px]" />
        </div>

        {/* Terminal body */}
        <div
          className="font-mono text-[13px] leading-[1.8] px-6 py-5 whitespace-pre-wrap"
          style={{ color: "oklch(0.92 0.005 260)" }}
        >
          {/* User prompt */}
          <div>
            <span style={{ color: "oklch(0.72 0.19 155)" }}>you&gt;</span>{" "}
            Check nginx config on prod-web-1 and reload if valid
          </div>

          {/* Blank line */}
          <div className="h-[1.8em]" />

          {/* Agent response */}
          <div>
            <span style={{ color: "var(--primary)" }}>agent&gt;</span>{" "}
            I'll check the nginx configuration and reload if it's valid.
          </div>

          {/* First command block */}
          <div style={{ color: "oklch(0.45 0.01 260)" }}>
            {"  "}┌{" "}
            <span style={{ color: "oklch(0.92 0.005 260)" }}>
              run_command
            </span>{" "}
            <span style={{ color: "oklch(0.75 0.05 260)" }}>prod-web-1</span>
          </div>
          <div style={{ color: "oklch(0.45 0.01 260)" }}>
            {"  "}│{" "}
            <span style={{ color: "oklch(0.92 0.005 260)" }}>
              $ nginx -t
            </span>
          </div>
          <div style={{ color: "oklch(0.45 0.01 260)" }}>
            {"  "}│{" "}
            <span style={{ color: "oklch(0.75 0.05 260)" }}>
              nginx: configuration file /etc/nginx/nginx.conf test is successful
            </span>
          </div>
          <div style={{ color: "oklch(0.45 0.01 260)" }}>
            {"  "}│{" "}
            <span style={{ color: "oklch(0.8 0.15 85)" }}>
              {"🛡️"} policy: allowed
            </span>{" "}
            ·{" "}
            <span style={{ color: "oklch(0.55 0.01 260)" }}>
              {"📋"} audit: logged
            </span>
          </div>
          <div style={{ color: "oklch(0.45 0.01 260)" }}>{"  "}└</div>

          {/* Second command block */}
          <div style={{ color: "oklch(0.45 0.01 260)" }}>
            {"  "}┌{" "}
            <span style={{ color: "oklch(0.92 0.005 260)" }}>
              run_command
            </span>{" "}
            <span style={{ color: "oklch(0.75 0.05 260)" }}>prod-web-1</span>
          </div>
          <div style={{ color: "oklch(0.45 0.01 260)" }}>
            {"  "}│{" "}
            <span style={{ color: "oklch(0.92 0.005 260)" }}>
              $ systemctl reload nginx
            </span>
          </div>
          <div style={{ color: "oklch(0.45 0.01 260)" }}>
            {"  "}│{" "}
            <span style={{ color: "oklch(0.72 0.19 155)" }}>
              {"✓"} nginx reloaded successfully
            </span>
          </div>
          <div style={{ color: "oklch(0.45 0.01 260)" }}>
            {"  "}│{" "}
            <span style={{ color: "oklch(0.8 0.15 85)" }}>
              {"🛡️"} policy: allowed
            </span>{" "}
            ·{" "}
            <span style={{ color: "oklch(0.55 0.01 260)" }}>
              {"📋"} audit: logged
            </span>
          </div>
          <div style={{ color: "oklch(0.45 0.01 260)" }}>{"  "}└</div>

          {/* Blank line */}
          <div className="h-[1.8em]" />

          {/* Agent conclusion */}
          <div>
            <span style={{ color: "var(--primary)" }}>agent&gt;</span>{" "}
            Done. Nginx config is valid and has been reloaded on prod-web-1.
          </div>
        </div>
      </div>
    </div>
  );
}
