.PHONY: compile

compile:
	pnpm cli compile -d src/data/langs -o public/_data
