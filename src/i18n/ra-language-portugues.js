module.exports = {
    ra: {
        action: {
            delete: "Apagar",
            show: "Exibir",
            list: "Listar",
            save: "Salvar",
            create: "Criar  ",
            edit: "Editar",
            sort: "Sort",
            cancel: "Cancelar",
            undo: "Undo",
            refresh: "Atualizar",
            add: "Adicionar",
            remove: "Apagar",
            add_filter: "Adicionar Filtro",
            remove_filter: "Cancelar filtro",
            back: "Go Back",
            bulk_actions: "%{smart_count} selected",
        },
        boolean: {
            true: "Sim",
            false: "Não",
        },
        page: {
            list: "Listar %{name}",
            edit: "%{name} #%{id}",
            show: "%{name} #%{id}",
            create: "Novo %{name}",
            dashboard: "Painel de Controle",
            not_found: "Not Found",
            loading: "Loading"
        },
        input: {
            file: {
                upload_several: "Arraste alguns arquivos para fazer o upload ou clique para selecionar arquivo",
                upload_single: "Arraste um arquivo para upload ou clique em selecionar arquivo.",
            },
            image: {
                upload_several: "Arraste alguns arquivos para fazer o upload ou clique para selecionar arquivo",
                upload_single: "Arraste um arquivo para upload ou clique em selecionar arquivo.",
            },
            references: {
                all_missing: "Unable to find references data.",
                many_missing:
                    "At least one of the associated references no longer appears to be available.",
                single_missing:
                    "Associated reference no longer appears to be available.",
            },
        },
        message: {
            yes: "Sim",
            no: "Não",
            are_you_sure: "Tem certeza?",
            about: "Sobre",
            not_found:
                "Either you typed a wrong URL, or you followed a bad link.",
            loading: "The page is loading, just a moment please",
            invalid_form: "The form is not valid. Please check for errors",
            delete_title: "Delete %{name} #%{id}",
            delete_content: "Are you sure you want to delete this item?",
            bulk_delete_title:
                "Delete %{name} |||| Delete %{smart_count} %{name} items",
            bulk_delete_content:
                "Are you sure you want to delete this %{name}? |||| Are you sure you want to delete these %{smart_count} items?",
        },
        navigation: {
            no_results: "Nenhum resultado encontrado",
            no_more_results:
                "The page number %{page} is out of boundaries. Try the previous page.",
            page_out_of_boundaries: "Página %{page} fora o limite",
            page_out_from_end: "Não é possível ir após a última página",
            page_out_from_begin: "Não é possível ir antes da primeira página",
            page_range_info: "%{offsetBegin}-%{offsetEnd} de %{total}",
            next: "Próximo",
            prev: "Anterior",
            page_rows_per_page: "Linhas por Página"
        },
        auth: {
            username: "Usuário",
            password: "Senha",
            sign_in: "Login",
            sign_in_error: "Erro na autenticação, tente novamente.",
            logout: "Sair",
        },
        notification: {
            updated: "Item atualizado com sucesso",
            created: "Item criado com sucesso",
            deleted: "Item removido com sucesso!",
            bad_item: "Incorrect element",
            item_doesnt_exist: "Esse item não existe mais",
            http_error: "Erro na comunicação com servidor",
            canceled: "Action cancelled",
        },
        validation: {
            required: "Obrigatório",
            minLength: "Deve ser ter no mínimo %{min} caracteres",
            maxLength: "Deve ter no máximo %{max} caracteres",
            minValue: "Deve ser %{min} ou maior",
            maxValue: "Deve ser %{max} ou menor",
            number: "Deve ser um número",
            email: "Deve ser um email válido",
            oneOf: "Must be one of: %{options}",
            regex: "Must match a specific format (regexp): %{pattern}",
        },
    },
}
