package main

import (
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"testing"
)

func TestNormalizeURLs(t *testing.T) {
	urls := normalizeURLs(" https://example.com/a ", []string{"", " https://example.com/b "})
	if len(urls) != 2 {
		t.Fatalf("normalizeURLs() count = %d, want 2", len(urls))
	}

	if urls[0] != "https://example.com/a" {
		t.Fatalf("normalizeURLs() first = %q", urls[0])
	}

	if urls[1] != "https://example.com/b" {
		t.Fatalf("normalizeURLs() second = %q", urls[1])
	}
}

func TestResolveOutputDir(t *testing.T) {
	server := &Server{saveRoot: "/tmp/godingtalk"}

	saveDir, relativeDir, err := server.resolveOutputDir("batch/job-1", "job-1")
	if err != nil {
		t.Fatalf("resolveOutputDir() error = %v", err)
	}

	if saveDir != filepath.Join("/tmp/godingtalk", "batch/job-1") {
		t.Fatalf("resolveOutputDir() saveDir = %q", saveDir)
	}

	if relativeDir != "batch/job-1" {
		t.Fatalf("resolveOutputDir() relativeDir = %q", relativeDir)
	}
}

func TestResolveOutputDirRejectsEscape(t *testing.T) {
	server := &Server{saveRoot: "/tmp/godingtalk"}

	if _, _, err := server.resolveOutputDir("../bad", "job-1"); err == nil {
		t.Fatal("resolveOutputDir() expected error for parent traversal")
	}
}

func TestWithAuth(t *testing.T) {
	server := &Server{authToken: "secret-token"}
	handler := server.withAuth(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNoContent)
	}))

	req := httptest.NewRequest(http.MethodGet, "/api/status", nil)
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)
	if rec.Code != http.StatusUnauthorized {
		t.Fatalf("without token status = %d, want %d", rec.Code, http.StatusUnauthorized)
	}

	req = httptest.NewRequest(http.MethodGet, "/api/status", nil)
	req.Header.Set("Authorization", "Bearer secret-token")
	rec = httptest.NewRecorder()
	handler.ServeHTTP(rec, req)
	if rec.Code != http.StatusNoContent {
		t.Fatalf("with token status = %d, want %d", rec.Code, http.StatusNoContent)
	}
}
