import PropTypes from 'prop-types';
// form
import { FormProvider as Form } from 'react-hook-form';

// ==============================|| COMPONENT: FORM PROVIDER ||============================== //

const FormProvider = ({ children, onSubmit, methods }: any) => {
    return (
        <Form {...methods}>
            <form onSubmit={onSubmit}>{children}</form>
        </Form>
    );
}

FormProvider.propTypes = {
    children: PropTypes.node,
    methods: PropTypes.object,
    onSubmit: PropTypes.func,
};

export default FormProvider
